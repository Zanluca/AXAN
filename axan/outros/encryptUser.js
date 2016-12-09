var crypto = require('crypto');
var encrypt = require('../utils/encryptData');

const key = 'sfg8GMpvpKcnriorcKtJGQuM7K4AMqHF6tFTUzeAkF7XFZzCzltp3XfZaItZbfV5';
var data = {
	user: 'tamires',
	password: 'qwert'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));