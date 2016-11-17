var gerarSequenciaAleatoria = require('../utils/gerarSequeciaAleatoria');
var ms = require('ms');

const msgError = 'Quantidade máxima de solicitações de acesso excedida';

// Modulo para solicitação de acesso
var autorizarAcesso = function (req, res) {

   // Busca o ip que realizou a requisição
   const ipOrigem =  req.connection.remoteAddress;

   var user = global.dicUsers[ipOrigem];
   
   // verificar se esse ip já tentou acessar
   if (user) {
		console.log('qtd tentativas solicita-acesso user: ' + user.numberRequestKeyLogon);
	  	// Se o tempo de espera está excedido, verifica se já passou o tempo de espera
     	if (Date.now() < user.timeForNextRequest) {
			user.numberRequestKeyLogon = 0;
			const tempoEspera = ms((user.timeForNextRequest - Date.now()), { long: true });
         console.log(msgError + ', aguarde: ' + tempoEspera);
         return res.status(400).send(msgError + ', aguarde: ' + tempoEspera);
	  // Se não excedeu a quantidade de tentativas incrementa numberRequestKeyLogon
	  } else if (user.numberRequestKeyLogon <= maxnumberRequestKeyLogon) {
         user.numberRequestKeyLogon += 1;
	  // Se excedeu a quantidade de tentativas pela 1ª vez, atualiza timeForNextRequest e gera uma nova chave
     } else {
      user.key = gerarSequenciaAleatoria();
		user.timeForNextRequest = Date.now() + global.timeForNextRequest;
      console.log(msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true }));
      return res.status(400).send(msgError + ', aguarde: ' + ms(global.timeForNextRequest, { long: true }));
      }
   // Se é a primeira tentaiva de acesso
   } else {
      user = {
         key: gerarSequenciaAleatoria(),
         numberRequestKeyLogon: 1,
         numberRequestLogon: 0,
         timeForNextRequest: 0
      }
      global.dicUsers[ipOrigem] = user;
   }
   // Retorna um json com a sequência aleatória
   return res.json({
      result: {
         token: user.key
      }
   });
}
module.exports = autorizarAcesso;