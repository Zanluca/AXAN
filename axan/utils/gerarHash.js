const crypto = require('crypto');

var gerarHash = function (data, algoritm, key, input_encoding, output_encoding) {

    // Não é um hash simples... https://pt.wikipedia.org/wiki/HMAC
    const hmac = crypto.createHmac(algoritm, key);
    hmac.update(data, input_encoding);
    return hmac.digest(output_encoding);
}

module.exports = gerarHash;