var jwt = require('jsonwebtoken');
var ms = require('ms');

const getKey = require('../utils/getKey');

module.exports = function(req, res, done) {

	const token = req.headers['x-access-token'];

	const secretToken = getKey('tokens_key');

   // Realiza o processo de validação			
	jwt.verify(token, secretToken, function(err, decoded) {
	// Aconteceu um erro na decodificação do token
		if (err) {
			done(err, undefined);
		// Conseguiu decodificar o token, fazer verificações
		} else {
			// Verificar se o token não expirou
			if (decoded.exp <= Date.now()) {
				err.name = 'Acesso Expirado';
				err.mesasge = 'Erro: Acesso Expirado, faça login novamente';
				done(err, undefined);
         // Não expirou, é válido
			} else {
            done(undefined, decoded.data);
         }
		}
	});

};