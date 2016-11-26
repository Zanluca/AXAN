var crypto = require('crypto');
var encrypt = require('../encryptData');

const key = 'Ks7ROdlLkUlBWUIIaW8GB4WSKFJrHRsE130wcADsCz2RFb5FLnC36IZy3zf2R04M';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));