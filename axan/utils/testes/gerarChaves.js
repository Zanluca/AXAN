const fs = require('fs');
var crypto = require('crypto');
// https://www.npmjs.com/package/generate-key
var rand = require('generate-key');

// Cria e salva a chave mestra com 2048 bits
const masterKey = rand.generateKey(256);
fs.writeFileSync('../keys/master_key.prt', masterKey);

// Cria e criptografa e salva a chave dos usuarios
var usersKey = rand.generateKey(64);
console.log("\nChave users original: " + usersKey);
usersKey = encrypt(usersKey, 'aes-256-ctr', masterKey, 'utf8', 'base64');
console.log("\nChave users crypto: " + usersKey);
fs.writeFileSync('../keys/users_key.prt', usersKey);

// Cria e criptografa e salva a chave das senhas
var passwordsKey = rand.generateKey(64);
console.log("\nChave passwords original : " + passwordsKey);
passwordsKey = encrypt(passwordsKey, 'aes-256-ctr', masterKey, 'utf8', 'base64');
console.log("\nChave passwords cryto : " + passwordsKey);
fs.writeFileSync('../keys/passwords_key.prt', passwordsKey);

function encrypt(data, algorithm, key, input_encoding, encoding) {
	var cipher = crypto.createCipher(algorithm, key);
	var crypted = cipher.update(data, input_encoding, encoding);
	crypted += cipher.final(encoding);
	return crypted;
}