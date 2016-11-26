var crypto = require('crypto');

function encrypt(data, algorithm, key, input_encoding, output_encoding){
	var cipher = crypto.createCipher(algorithm, key);
  	var crypted = cipher.update(data, input_encoding, output_encoding);
  	crypted += cipher.final(output_encoding);
  	return crypted;
};

module.exports = encrypt;