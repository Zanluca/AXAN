var crypto = require('crypto');
var encrypt = require('../encryptData');

const key = 'vJ88a5wbo43IlpREf8tXfQUNHyxQh8TnORBhnH96oirXJixkov6O7VPTbtZQsn4E';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));