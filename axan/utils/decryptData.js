var crypto = require('crypto');

function decrypt(data, algorithm, key, input_encoding, output_encoding) {
	var decipher = crypto.createDecipher(algorithm, key);
  	var dec = decipher.update(data, output_encoding, input_encoding);
  	dec += decipher.final(input_encoding);
  	return dec;
};

module.exports = decrypt;