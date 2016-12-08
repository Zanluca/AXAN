var crypto = require('crypto');
var encrypt = require('../utils/encryptData');

const key = 'TNAo1WAKis2RlFl1GP2hSqDXBnbIshVv2kxrNRmnRBOzBmkO1U37r3RxrQ4VOft1';
var data = {
	user: 'tamires',
	password: 'qwert'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));