var crypto = require('crypto');
var encrypt = require('../utils/encryptData');

const key = 'K2kqqMSM2pE5UlduwF0rdipaNO65ihcB8bPuhnAGTS7KLWg8BEWBZKuH4mfi3NkB';
var data = {
	user: 'joao',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));