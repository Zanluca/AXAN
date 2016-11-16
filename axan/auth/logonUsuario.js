const gerarHash = require('../utils/gerarHash');
var jwt = require('jsonwebtoken');
var ms = require('ms');

const msgError = 'Quantidade máxima de solicitações de logon excedida';

// Utilizado para o algoritmo HASH
const algoritmHash = 'sha512';
const input_encoding = 'utf8';
const encoding = 'base64';

module.exports = function(req, res) {

   const ipOrigem =  req.connection.remoteAddress;
   const token = req.headers['x-access-token'];
   
   // Verificar se o token foi informado
   if (token) {
      // Verificar se esse ip está na lista de acesso 
      var user = dicUsers[ipOrigem];
      if (user) {
         console.log('qtd tentativas logon user: ' + user.numberRequestLogon);
         // Se o tempo de espera está excedido, verifica se já passou o tempo de espera
         if (Date.now() < user.timeForNextRequest) {
            // Lançar um trow
            user.numberRequestLogon = 0;
            const tempoEspera = ms((user.timeForNextRequest - Date.now()), { long: true });
            console.log(msgError + ', aguarde: ' + tempoEspera);
            return res.json({
            result: {
               error: msgError + ', aguarde: ' + tempoEspera
            }
            });
      // Se não excedeu a quantidade de tentativas incrementa numberRequestLogon
      } else if (user.numberRequestLogon <= maxNumberRequestLogon) {
            user.numberRequestLogon += 1;

            // Realiza o processo de validação			
            jwt.verify(token, user.key, function(err, decoded) {
               // Aconteceu um erro na decodificação do token
               if (err) {
                  console.log(err);
                  return res.json({
                     result: {
                        error: err
                     }
                  });
               // Conseguiu decodificcar o token, fazer verificações
               } else {
                  console.log(decoded.data);
                  // Verificar se o token não expirou
                  if (decoded.exp <= Date.now()) {
                     error = 'Erro: Acesso Expirado, faça login novamente';
                     return res.json({
                        result: {
                           error: {
                              name: 'TokenExpiredError',
                              message: 'jwt expired'
                           }
                        }
                     });
                  }

                  // Gerar os hashs do user e password 
                  const hashUser = gerarHash(decoded.data.user, algoritmHash, input_encoding, encoding);
                  const hashPassword = gerarHash(decoded.data.password, algoritmHash, input_encoding, encoding);
                  console.log("usuario: " + hashUser);
                  console.log("senha: " + hashPassword);

                  // Autenticar user

                  // Retornar um outro token, com uma validade maior
                  return res.json({
                     result: {
                        token: decoded.data
                     }
                  });
               }
            });

      // Se excedeu a quantidade de tentativas pela 1ª vez, atualiza timeForNextRequest
      } else {
         // Lançar um trow
         user.timeForNextRequest = Date.now() + global.timeForNextRequest;
         console.log(msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true }));
         return res.json({
            result: {
               error: msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true })
            }
         });
      }
      // Não encontrou o usuario
      } else {
         return res.json({
            result: {
               error: {
                  name: 'UserNotFoundError',
                  message: 'user not found'
               }
            }
         });
      }
   // Não encontrou o token
   } else {
      return res.json({
         result: {
            error: {
               name: 'TokenNotFoundError',
               message: 'jwt not found'
            }
         }
      });
   }
};