var crypto = require('crypto');
var encrypt = require('../utils/encryptData');

const key = 'pS3rAFtEXLd305wUCCeQfzQVtqBTk3nfmETpsXscxDTl7Zkdovk96RZTIHFlxauq';
var data = {
	user: 'joao_paulosg',
	password: '123456'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));