const validarToken = require('../auth/validarJWT');
const usuarioDao = require('../dao/usuarioDao');
const verificarIntegridade = require('../utils/verificarIntegridadePrecos');

var funcionario = {

	cadastrarProduto: function(req, res) {
		console.log("cadastrando produto...");
		const tokenData = validarToken(req, res, function (err, tokenData) {
			
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Token Válido...");

			if (tokenData) {
            // É admin
            if (tokenData.roles == 'admin') {
               console.log("Usuário válido...");
               const produto = JSON.parse(req.params.produto);
               usuarioDao.cadastrarProduto(produto.nome, produto.preco, produto.cod_cnpj, function (cadastrou) {
               	if (cadastrou) {
                		console.log("Produto cadastrado...");
                		res.status(200).send("Produto cadastrado");
                	} else {
                		console.log("Produto não cadastrado...");
                		return res.status(200).send("Produto não cadastrado");
                	}
               });
            // não é admin
            } else {
               return res.status(400).send("Você não tem permissão para realizar essa ação");
            }
		   }
		});
	},

   verificarIntegridade: function(req, res) {
      console.log("verificando integridade de dados...");
		const tokenData = validarToken(req, res, function (err, tokenData) {
			
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Token Válido...");

			if (tokenData) {
            // É admin
            if (tokenData.roles == 'admin') {
               console.log("Usuário válido...");
               verificarIntegridade(function (vetorProdutosAlterados) {
                  if (vetorProdutosAlterados && vetorProdutosAlterados.length > 0) {
                     return res.status(200).send({
                        msg: "Os seguitens Produtos estão com os produtos alterados:\n",
                        dados: vetorProdutosAlterados
                     });
                  }
                  return res.status(200).send("Todos os dados estão integros");
               });
            // não é admin
            } else {
               return res.status(400).send("Você não tem permissão para realizar essa ação");
            }
		   }
		});
   }
};

module.exports = funcionario;