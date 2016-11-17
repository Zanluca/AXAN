var jwt = require('jsonwebtoken');
var ms = require('ms');

var secretKey = 'uhFxMTsOa2GkzmDma189dGzS5hrbQAjFqBuLcyzOkOCFiy3dWdJc7rn2ZMaz2aRyALmHoCporAci+k2HdvGEkA==';

var token = jwt.sign({
   exp: Date.now() + ms('1m'),
   algorithm: 'ES384', 
   data: {
      user: 'joao_paulosg',
      password: '123456'
  }
}, secretKey);

console.log(token);