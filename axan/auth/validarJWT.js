var jwt = require('jsonwebtoken');
var ms = require('ms');

const getKey = require('../utils/getKey');

module.exports = function(req, res) {

	const token = req.headers['x-access-token'];	

	const secretToken = getKey('tokens_key');

   // Realiza o processo de validação			
	jwt.verify(token, user.key, function(err, decoded) {
	// Aconteceu um erro na decodificação do token
		if (err) {
			console.log(err.name + " - " + err.message);
			res.status(400).send(err.name + " - " + err.message);
         return;
		// Conseguiu decodificcar o token, fazer verificações
		} else {
			console.log("info token: " + decoded.data);
			// Verificar se o token não expirou
			if (decoded.exp <= Date.now()) {
				console.log('Erro: Acesso Expirado, faça login novamente')
				res.status(400).send('Erro: Acesso Expirado, faça login novamente');
            return;
         // Não expirou, é válido
			} else {
            return true;
         }
		}
	});

};