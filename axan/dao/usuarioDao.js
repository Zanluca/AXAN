var pg = require('pg');
const configDB = require('./configDB');
const gerarHash = require('../utils/gerarHash');

// Utilizado para o algoritmo HASH do user e password
const algorithmHash = 'sha512';
const input_encoding = 'utf8';
const output_encoding_hash = 'base64';

module.exports = {

   autenticar: function(hashUser, password, callback) {
      
      const sql = "select ds_Senha, salt from usuario where nm_usuario = '"+hashUser+"';";

      console.log(sql);
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

            const hashPassword = result.rows[0].ds_senha;
            const salt = result.rows[0].salt;

            if (hashPassword && salt) {
               const hashPasswordAtual = gerarHash(password, algorithmHash, salt, input_encoding, output_encoding_hash);
               if (hashPasswordAtual === hashPassword) {
                  callback(true);
               }
            } else {
               callback(false);
            }

            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
      });

      return undefined;

   },

   cadastar: function(hashUser, hashPassword, password_salt, userDetails, callback) {

      const sql = "select insert_user('"+hashUser+"','"+hashPassword+"','"+password_salt+"',to_date('"+userDetails.dateOfBirth+"','dd/mm/yyyy'),"+
      "'"+userDetails.email+"', "+userDetails.phone.number+","+userDetails.phone.ddd+",'"+userDetails.phone.country+"')";

      console.log(sql);
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
   },

};
