/*var jwt = require('jsonwebtoken');
var ms = require('ms');
var gerarChaveSimetrica = require('./gerarChaveSimetrica');

var secretKey = '';//gerarChaveSimetrica(512);
console.log("secretKey: " + secretKey);

var token = jwt.sign({
   expiresIn: '2m',
   algorithm: 'ES384', 
   data: {
      user: 'joao_paulosg',
      password: '123456'
  }
}, secretKey);

console.log('token: ' + token);

var decoded = jwt.verify(token, secretKey);
console.log(decoded.data);*/

//https://github.com/kelektiv/node-uuid
var uuid = require('node-uuid');

console.log(uuid.v4());

