const crypto = require('crypto');

var gerarHash = function (data, algoritm, input_encoding, encoding) {
    const hash = crypto.createHash(algoritm);
    hash.update(data, input_encoding);
    return hash.digest(encoding);
}

module.exports = gerarHash;