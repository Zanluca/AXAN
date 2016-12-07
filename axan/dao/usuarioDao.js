var pg = require('pg');
const configDB = require('./configDB');
const gerarHash = require('../utils/gerarHash');

// Utilizado para o algoritmo HASH do user e password
const algorithmHash = 'sha512';
const input_encoding = 'utf8';
const output_encoding_hash = 'base64';

module.exports = {

   autenticar: function(user, password, callback) {
      
      const hashUser = gerarHash(user, algorithmHash, '', input_encoding, output_encoding_hash);
      const sql = "select tipo, ds_senha, salt from usuario where nm_usuario = '"+hashUser+"';";
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
                  console.log("hashs iguais");
                  callback({
                     id: result.rows[0].id,
                     type: result.rows[0].tipo
                  });
               } else {
                  callback(undefined);   
               }
            } else {
               callback(undefined);
            }

            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
      });
   },

   cadastar: function(hashUser, hashPassword, password_salt, userDetails, callback) {

      sql = "insert into usuario (nm_usuario, ds_senha, salt, tipo, ds_email, dt_nascimento, nr_celular, nr_ddd, cd_pais)"+
      "values ('"+hashUser+"','"+hashPassword+"','"+password_salt+"','"+userDetails.type+"', '"+userDetails.email+
      "',to_date('"+userDetails.dateOfBirth+"','dd/mm/yyyy'),"+userDetails.phone.number+","+userDetails.phone.ddd+",'"+userDetails.phone.country+"')";

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

   cadastrarProduto: function(nome, preco, cnpj_varejista, cd_categoria) {

         const sql = "insert into produto (nm_produto, qt_preco, cnpj_varejista, cd_categoria)" + 
         "values ('"+nome+"',"+preco+",'"+cnpj_varejista+"',"+cd_categoria+")";

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
