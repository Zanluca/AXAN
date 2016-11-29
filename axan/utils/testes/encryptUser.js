var crypto = require('crypto');
var encrypt = require('../encryptData');

const key = 'sWXn2KO2DlQtbEbKWQZLeQHRXbVSuIRi3Z0Oc3BBdTVMKW2Nf2dsWTAZptPw7eTc';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));