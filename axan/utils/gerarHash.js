const crypto = require('crypto');

var gerarHash = function (data, algoritm, salt, input_encoding, output_encoding) {

    // o ideal seria não apenas concatenar
    data = salt + data;

    const hash = crypto.createHash(algoritm);
    hash.update(data, input_encoding);
    return hash.digest(output_encoding);
}

module.exports = gerarHash;