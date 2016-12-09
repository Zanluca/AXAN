const validarToken = require('../auth/validarJWT');
const usuarioDao = require('../dao/usuarioDao');

var usuario = {

   getListaDeCompras: function(req, res) {

   	console.log("Buscando lista de compras...");
	   const tokenData = validarToken(req, res, function (err, tokenData) {
		
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Token Válido...");

			if (tokenData) {
            // É client
            if (tokenData.roles == 'client') {
               console.log("Usuário válido...");
               usuarioDao.listarCompras(tokenData.userId, function (listaProdutos) {
                  if (listaProdutos && listaProdutos.length > 0) {
                     console.log("Listando produtos...");
                     return res.status(200).send(listaProdutos);
                  } else {
                     console.log("Não há produtos para listar...");
                     return res.status(200).send("Não há produtos na lista de compras");
                  }
               });
            }
         }
		 });
	},

	addItemListaCompras: function(req, res) {

		console.log("Buscando lista de compras...");
	   const tokenData = validarToken(req, res, function (err, tokenData) {
		
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Token Válido...");

			if (tokenData) {
            // É client
            if (tokenData.roles == 'client') {
               console.log("Usuário válido...");
               usuarioDao.addItemListaCompras(tokenData.userId, req.params.produtoId, function (listaProdutos) {
                  if (listaProdutos && listaProdutos.length > 0) {
                     console.log("Listando produtos...");
                     return res.status(200).send(listaProdutos);
                  } else {
                     console.log("Não há produtos para listar...");
                     return res.status(200).send("Não há produtos na lista de compras");
                  }
               });
            }
         }
		 });
	},

	addCartaoDeCredito: function(req, res) {

		console.log("Buscando lista de compras...");
	   const tokenData = validarToken(req, res, function (err, tokenData) {
		
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Token Válido...");

			if (tokenData) {
            // É client
            if (tokenData.roles == 'client') {
               console.log("Usuário válido...");
               usuarioDao.addCartaoDeCredito(tokenData.userId, req.params.nrCartao, function (listaProdutos) {
                  if (listaProdutos && listaProdutos.length > 0) {
                     console.log("Listando produtos...");
                     return res.status(200).send(listaProdutos);
                  } else {
                     console.log("Não há produtos para listar...");
                     return res.status(200).send("Não há produtos na lista de compras");
                  }
               });
            }
         }
		 });

	}

};

module.exports = usuario;