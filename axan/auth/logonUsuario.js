var jwt = require('jsonwebtoken');
var ms = require('ms');

const gerarHash = require('../utils/gerarHash');
const decrypt = require('../utils/decryptData');
const usuarioDao = require('../dao/usuarioDao');

const msgError = 'Quantidade máxima de solicitações de logon excedida';

// Utilizado para o algoritmo decrypt na comunicação com o Client
const algorithmEncrypt = 'aes-256-ctr';
const output_encoding_aes = 'hex';

// Utilizado para o algoritmo HASH do user e password
const algorithmHash = 'sha512';
const input_encoding = 'utf8';
const output_encoding_hash = 'base64';

module.exports = function(req, res) {

	const ipOrigem =  req.connection.remoteAddress;
   const encryptedData = req.params.encryptedData;
	console.log(encryptedData);

   // Verificar se o encryptedData foi informado
   if (encryptedData) {
      // Verificar se esse ip está na lista de acesso 
      var user = dicUsers[ipOrigem];
      if (user) {
         console.log('qtd tentativas logon user: ' + user.numberRequestLogon);
         // Se o tempo de espera está excedido, verifica se já passou o tempo de espera
         if (Date.now() < user.timeForNextRequest) {
            user.numberRequestLogon = 0;
            const tempoEspera = ms((user.timeForNextRequest - Date.now()), { long: true });
            console.log(msgError + ', aguarde: ' + tempoEspera);
            return res.status(400).send(msgError + ', aguarde: ' + tempoEspera);
      	// Se não excedeu a quantidade de tentativas incrementa numberRequestLogon
      	} else if (user.numberRequestLogon <= maxNumberRequestLogon) {
				user.numberRequestLogon += 1;

				try {
					var userInfo = decrypt(encryptedData, algorithmEncrypt, user.key, input_encoding, output_encoding_aes);
					userInfo = JSON.parse(userInfo);
					console.log('conseguiu descriptografar os dados enviados');

               const hashUser = gerarHash(userInfo.user, algorithmHash, '', input_encoding, output_encoding_hash);
               // Autenticar user no banco...
               usuarioDao.autenticar(hashUser, userInfo.password, function(userAuth) {
                  // Conseguiu autenticar o usuario
                  if (userAuth) {
                     // Cria um jwt com as informações do usuario, para autenticar e controlar o acesso posteriormente 
                     const token = jwt.sign({
                        exp: Date.now() + ms('7 days'),
                        algorithm: 'ES384', 
                        data: {
                           userId: userAuth.id
                        }
                     }, user.key);
                     
                     return res.json({
                        result: {
                           token: token,
                           usuario: {
                              id: userAuth.id,
                              nome: userAuth.nome
                           },
                           roles: [userAuth.tipo]
                        }
                     });
                  // Não conseguiu autenticar
                  } else {
                     return res.status(400).send("Usuário ou senha incorretos");
                  }
               });

				} catch (error) {
					console.log(error.name + " - " + error.message);
					return res.status(400).send(error.name + " - " + error.message);
				}

			// Se excedeu a quantidade de tentativas pela 1ª vez, atualiza timeForNextRequest
			} else {
				user.timeForNextRequest = Date.now() + global.timeForNextRequest;
				console.log(msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true }));
				return res.status(400).send(msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true }));
			}
      // Não encontrou o usuario
      } else {
         return res.status(400).send("Primeiro solicite acesso");
      }
   // Não encontrou os dados
	} else {
		return res.status(400).send("Dados incorretos");
	}
};