var crypto = require('crypto');
var encrypt = require('../encryptData');

const key = 'SMaTzGbmzMfdudb9VAHTRoS0JdTEEighnVhTASkBZ5DrBDQzRK6bm20EghXy8d8M';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));