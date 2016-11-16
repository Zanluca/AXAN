var jwt = require('jsonwebtoken');
var ms = require('ms');

var secretKey = '';

var token = jwt.sign({
   exp: Date.now() + ms('1m'),
   algorithm: 'ES384', 
   data: {
      user: 'joao_paulosg',
      password: '123456'
  }
}, secretKey);

console.log(token);