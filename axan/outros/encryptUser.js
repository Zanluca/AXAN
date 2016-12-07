var crypto = require('crypto');
var encrypt = require('../utils/encryptData');

const key = 'gv7DaHxDgZsJ0wBadhdFt5o6n65sfSJ6tMNNLBLxhG6RrsbMzRK3u89cC21WT1Au';
var data = {
	user: 'tamires',
	password: 'qwert'
};

data = JSON.stringify(data);
console.log("JSON: " + data);
console.log(encrypt(data, 'aes-256-ctr', key, 'utf8', 'hex'));