const rand = require('generate-key');
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
	var userDetails = req.query.details;

   // Verificar se o encryptedData foi informado
   if (encryptedData && userDetails) {
      // Verificar se esse ip está na lista de acesso 
      var user = dicUsers[ipOrigem];
      if (user) {
         try {
				// Descriptorafa os dados recebidos do Client
            var userInfo = decrypt(encryptedData, algorithmEncrypt, user.key, input_encoding, output_encoding_aes);
				userInfo = JSON.parse(userInfo);
				console.log('conseguiu descriptografar os dados enviados');

				userDetails = JSON.parse(userDetails);

            // Utilizado como salt, para complementar o hash da senha
            const password_salt = rand.generateKey(64);
				// Gerar os hashs do user e password 
				const hashUser = gerarHash(userInfo.user, algorithmHash, '', input_encoding, output_encoding_hash);
				const hashPassword = gerarHash(userInfo.password, algorithmHash, password_salt, input_encoding, output_encoding_hash);
				
				// Cadastrar user no banco...
				const registered = usuarioDao.cadastar(hashUser, hashPassword, password_salt, userDetails, function (registered) {
               console.log("registered: " + registered);
               if (registered) {
                  return res.status(200).send("Cadastro realizado com sucesso");
               } else {
                  return res.status(400).send("Não conseguiu realizar cadastro");
               }
            });

         } catch (error) {
				console.log(error.name + " - " + error.message);
				return res.status(400).send(error.name + " - " + error.message);
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