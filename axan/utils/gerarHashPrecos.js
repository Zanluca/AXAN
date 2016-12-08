var pg = require('pg');
const fs = require('fs');
var rand = require('generate-key');

const configDB = require('./configDB');
var encrypt = require('./encryptData');
var decrypt = require('./decryptData');

const algorithm = 'aes-256-ctr';
const masterKey = fs.readFileSync('keys/master_key.prt', {encoding: 'utf8'});

//var salt = rand.generateKey(32);
//salt = encrypt(salt, algorithm, masterKey, 'utf8', 'base64');
//fs.writeFileSync('keys/salt_preco.prt', salt);

var salt = fs.readFileSync('keys/salt_preco.prt', {encoding: 'utf8'});
salt = decrypt(salt, 'aes-256-ctr', masterKey, 'utf8', 'base64');

const sql = "insert into produto (nm_produto, qt_preco, cnpj_varejista, hash_preco, cd_categoria)" + 
      "values ('"+nome+"',"+preco+",'"+cnpj_varejista+"','"+hash_preco+"',cd_categoria)";

      var db = new pg.Client(configDB);

      db.connect(function (err) {
         
         if (err) throw err;
         
         db.query(sql, null, function (err, result) {
            if (err) {
               db.end(function (err) {
                  if (err) throw err; else console.log("conexão encerrada");
               });
               callback(false);
               throw err;
            }

            callback(true);

            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
      });