var gerarChaveSimetrica = require('../utils/gerarChaveSimetrica');
var ms = require('ms');

const msgError = 'Quantidade máxima de solicitações de acesso excedida';

var autorizarAcesso = function (req, res) {

   const ipOrigem =  req.connection.remoteAddress;
   // verificar se esse ip já tentou acessar 
   var user = global.dicUsers[ipOrigem];
   if (user) {
		console.log('qtd tentativas solicita-acesso user: ' + user.numberRequestKeyLogon);
	  	// Se o tempo de espera está excedido, verifica se já passou o tempo de espera
     	if (Date.now() < user.timeForNextRequest) {
		  	// Lançar um trow
			user.numberRequestKeyLogon = 0;
			const tempoEspera = ms((user.timeForNextRequest - Date.now()), { long: true });
         console.log(msgError + ', aguarde: ' + tempoEspera);
         return res.json({
           result: {
             error: msgError + ', aguarde: ' + tempoEspera
           }
         });
	  // Se não excedeu a quantidade de tentativas incrementa numberRequestKeyLogon
	  } else if (user.numberRequestKeyLogon <= maxnumberRequestKeyLogon) {
         user.numberRequestKeyLogon += 1;
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
   } else {
      user = {
         key: gerarChaveSimetrica(512),
         numberRequestKeyLogon: 1,
         numberRequestLogon: 0,
         timeForNextRequest: 0
      }
      global.dicUsers[ipOrigem] = user;
   }

   return res.json({
      result: {
         token: user.key
      }
   });

}

module.exports = autorizarAcesso;