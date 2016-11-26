const fs = require('fs');
const decrypt = require('./decryptData');

function getKey(fileName) {
	const masterKey = fs.readFileSync('keys/master_key.prt', {encoding: 'utf8'});
	var key = fs.readFileSync('keys/'+fileName+'.prt', {encoding: 'utf8'});
	key = decrypt(key, 'aes-256-ctr', masterKey, 'utf8', 'base64')
	return key;
};

module.exports = getKey;