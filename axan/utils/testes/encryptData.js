var crypto = require('crypto');

function encrypt(data, algorithm, key, input_encoding, encoding) {
	var cipher = crypto.createCipher(algorithm, key);
	var crypted = cipher.update(data, input_encoding, encoding);
	crypted += cipher.final(encoding);
	return crypted;
}

const key = '896487b9-72bb-4d51-bc0e-2c38dcde32a7';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};
data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'base64'));