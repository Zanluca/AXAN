const fs = require('fs');
var crypto = require('crypto');
var rand = require('generate-key');

var encrypt = require('../encryptData');
var decrypt = require('../decryptData');

const algorithm = 'aes-256-ctr';

//------------------------------------------------------------

const masterKey = rand.generateKey(256);
fs.writeFileSync('keys/master_key.prt', masterKey);

var users_key = rand.generateKey(64);
console.log('users_key gerada : ' + users_key);
var users_key_encrypt = encrypt(users_key, algorithm, masterKey, 'utf8', 'base64');
fs.writeFileSync('keys/users_key.prt', users_key_encrypt);
users_key_encrypt = fs.readFileSync('keys/users_key.prt', {encoding: 'utf8'});
console.log('users_key decrypt: ' + decrypt(users_key_encrypt, algorithm, masterKey, 'utf8', 'base64'));

var passwords_key = rand.generateKey(64);
console.log('passw_key gerada : ' + passwords_key);
var passwords_key_encrypt = encrypt(passwords_key, algorithm, masterKey, 'utf8', 'base64');
fs.writeFileSync('keys/passwords_key.prt', passwords_key_encrypt);
passwords_key_encrypt = fs.readFileSync('keys/passwords_key.prt', {encoding: 'utf8'})
console.log('passw_key decrypt: ' + decrypt(passwords_key_encrypt, algorithm, masterKey, 'utf8', 'base64'));