var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'fJ5Zyhv1C8JJ9R8E0TOPtBHOyBsw8tZVxxn0UOa6Ghw4CnrA0DOU3oe0DQ3bBG8JzTXex0gNhkAoP6mnH9F53GcERUeHkZWfhe9qR3K1os06ZuRW1czDvkpxrhE7a3UMQWF7cMcxvCyIDuAzJ3PNo4uMW9dZfZ32SxM3ScPcTPlF3mtLIBmNxxPsZTfIF58LFlxLkDaBx7v1miHsg7W9MwtsXRpNJwIvysD0klOP4vkkk8ELBT8snaXwoNUn6rrb';

// http://lollyrock.com/articles/nodejs-encryption/

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','base64')
  crypted += cipher.final('base64');
  return crypted;
}
 
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 
var hw = encrypt("uDGvJDYfg96QfutG")

//console.log(hw);
// outputs hello world
console.log(decrypt('uDGvJDYfg96QfutG'));