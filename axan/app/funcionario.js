const validarToken = require('../auth/validarJWT');
const usuarioDao = require('../dao/usuarioDao');

var funcionario = {

	cadastrarProduto: function(req, res) {
		console.log("cadastrando produto");
		const tokenData = validarToken(req, res, function (err, tokenData) {
			
			if (err) {
				console.log(err.name + " - " + err.message);
				return res.status(400).send(err.name + " - " + err.message);
			}
			console.log("Sem erro");

			if (tokenData) {
			console.log(JSON.stringify(tokenData));
			const produto = req.params.produto;
			return res.status(200).send("Produto cadastrado");

			/*usuarioDao.cadastrarProduto(produto.nome, produto.preco, produto.cod_cnpj, 
			produto.categoria, function (cadastrou) {
					if (cadastrou) {

					} else {
					
					}
			});*/
		} else {
			return res.status(400).send("Produto não cadastrado");
		}
		});
	},

	alterarPrecoProduto: function(req, res) {

	}
};

module.exports = funcionario;