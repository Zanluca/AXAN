var express = require('express');
var ms = require('ms');
// Criando uma instância do express
var app = express();
// Porta do server
var port = 3000;
// Criando uma instância de solicitarAcesso
var solicitarAcesso = require('../auth/solicitarAcesso');
// Criando uma instância de logonUsuario
var logon = require('../auth/logonUsuario');
// Criando uma instância de registerUsuario
var cadastarUsuario = require('../auth/registerUsuario');
// Criando uma instância de usuario
var usuario = require('./usuario');
// Criando uma instância de funcionario
var funcionario = require('./funcionario');

// Escopo global
// Dicionário usando ipOrigem como chave, contendo numberRequestKeyLogon, numberRequestLogon e key
global.dicUsers = {};
global.maxnumberRequestKeyLogon = 3;
global.maxNumberRequestLogon = 3;
global.timeForNextRequest = ms('30s');

// http://expressjs.com/pt-br/guide/error-handling.html

app.post('/api/security/logon/solicita-acesso', solicitarAcesso);

app.post('/api/security/logon/:encryptedData', logon);

app.post('/api/security/register/user/:encryptedData', cadastarUsuario);
// terminar a implementação e testar
app.post('/api/user/client/get-lista-compras', usuario.getListaDeCompras);
// terminar a implementação e testar
app.post('/api/user/client/add-item-lista-compras', usuario.addItemListaCompras);
// testar o hash
app.post('/api/user/funcionario/cadastrar-produto/:produto', funcionario.cadastrarProduto);

app.post('/api/user/funcionario/verificar-integridade', funcionario.verificarIntegridade);

// Iniciando o servidor
app.listen(port, function () {
	console.log('Server escutando na porta ' + port + '!');
	// Verificando a integridade dos dados...
	const verificarIntegridade = require('../utils/verificarIntegridadePrecos');
	verificarIntegridade(function (vetorProdutosAlterados) {
		if (vetorProdutosAlterados && vetorProdutosAlterados.length > 0) {
			console.log("Os seguintes Produtos estão com os preços alterados:");
			console.log(JSON.stringify(vetorProdutosAlterados));
		} else {
			console.log("Todos os dados estão integros");
		}
	});
});
