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

// Escopo global
// Dicionário usando ipOrigem como chave, contendo numberRequestKeyLogon, numberRequestLogon e key
global.dicUsers = {};
global.maxnumberRequestKeyLogon = 3;
global.maxNumberRequestLogon = 3;
global.timeForNextRequest = ms('30s');

// http://expressjs.com/pt-br/guide/error-handling.html

app.post('/api/logon/solicita-acesso', solicitarAcesso);

app.post('/api/logon', logon);

// Iniciando o servidor
app.listen(port, function () {
  console.log('Server escutando na porta ' + port + '!');
});
