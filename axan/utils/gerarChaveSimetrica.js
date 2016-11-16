const crypto = require('crypto');

module.exports = function (bits) {

   /**
    * DiffieHellman é usado na verdade para criptografia
    * assimetrica, mas atende a necessidade, embora seja
    * mais custoso.
    */
   const generator = crypto.createDiffieHellman(bits);
   // https://nodejs.org/dist/latest-v6.x/docs/api/crypto.html#crypto_class_diffiehellman
   const publicKey = generator.generateKeys('base64');
   const privateKey = generator.getPrivateKey('base64');

   //console.log("Public Key: " + publicKey);
   //console.log("Private Key: " + privateKey);

   return publicKey;
};