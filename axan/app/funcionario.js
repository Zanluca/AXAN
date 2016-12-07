const validarToken = require('../auth/validarJWT');
const usuarioDao = require('../dao/usuarioDao');

var funcionario = {

	cadastrarProduto: function(req, res) {
      
      const isValidToken = validarToken(req, res);
      if (isValidToken) {
         const produto = req.params.produto;
         usuarioDao.cadastrarProduto(produto.nome, produto.preco, produto.cod_cnpj, 
         produto.categoria, function (cadastrou) {
            if (cadastrou) {

            } else {
               
            }
         });
      }

	},

	alterarPrecoProduto: function(req, res) {

	}
};

module.exports = funcionario;