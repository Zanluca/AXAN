const fs = require('fs');
var crypto = require('crypto');
var rand = require('generate-key');

var encrypt = require('../utils/encryptData');
var decrypt = require('../utils/decryptData');

const algorithm = 'aes-256-ctr';

//------------------------------------------------------------

const masterKey = rand.generateKey(256);
fs.writeFileSync('keys/master_key.prt', masterKey);

var tokens_key = rand.generateKey(64);
console.log('tokens_key gerada : ' + tokens_key);
var tokens_key_encrypt = encrypt(tokens_key, algorithm, masterKey, 'utf8', 'base64');
fs.writeFileSync('keys/tokens_key.prt', tokens_key_encrypt);
tokens_key_encrypt = fs.readFileSync('keys/tokens_key.prt', {encoding: 'utf8'});
console.log('tokens_key decrypt: ' + decrypt(tokens_key_encrypt, algorithm, masterKey, 'utf8', 'base64'));