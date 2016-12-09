var pg = require('pg');
const fs = require('fs');
const configDB = require('./configDB');
const getKey = require('../utils/getKey');
const gerarHash = require('../utils/gerarHash');

// Utilizado para o algoritmo HASH do user e password
const algorithmHash = 'sha512';
const input_encoding = 'utf8';
const output_encoding_hash = 'base64';

module.exports = {

   autenticar: function(user, password, callback) {
      console.log("autenticando...");
      const hashUser = gerarHash(user, algorithmHash, '', input_encoding, output_encoding_hash);
      const sql = "select id_usuario, tipo, ds_senha, salt from usuario where nm_usuario = '"+hashUser+"';";
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
                  console.log("hashs iguais");
                  callback({
                     id: result.rows[0].id_usuario,
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

   cadastrarProduto: function(nome, preco, cnpj_varejista, callback) {

      // Buscar id para usar no salt
      var sql = "select max(cd_produto) +1 as id from produto";
      var id = "";
      var db = new pg.Client(configDB);

      db.connect(function (err) {
         
         if (err) throw err;
         
         db.query(sql, null, function (err, result) {
            if (err) {
               db.end(function (err) {
                  if (err) throw err; else console.log("conexão encerrada");
               });
               console.log("Não conseguiu recuperar o último id");
               throw err;
            }

            // id que será gerado quando registrar no banco
            id = result.rows[0].id
            var salt = getKey('salt_preco');
            salt = id + salt;
            console.log("salt = " +salt);
            const precoH = '$'+preco; // Não esquecer que é 'sha256' para o preço
            console.log("preco do hash: " + precoH);
            const hash_preco = gerarHash(precoH, 'sha256', salt, input_encoding, output_encoding_hash);

            sql = "insert into produto (cd_produto, nm_produto, qt_preco, cnpj_varejista, hash_preco, cd_categoria)" + 
            "values ("+id+",'"+nome+"',"+preco+",'"+cnpj_varejista+"','"+hash_preco+"',"+ 1 +")";
            console.log(sql);

            db.query(sql, null, function (err, result) {
               if (err) {
                  console.log("###############");
                  db.end(function (err) {
                     if (err) throw err; else console.log("conexão encerrada");
                  });
                  callback(false);
                  throw err;
               }
            });

            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
            callback(true);
      });
   },

   listarCompras: function(userId, callback) {
      
      const sql = "SELECT ("+userId+")";
      console.log(sql);
      var db = new pg.Client(configDB);

      db.connect(function (err) {
         
         if (err) throw err;
         
         db.query(sql, null, function (err, result) {
            if (err) {
               db.end(function (err) {
                  if (err) throw err; else console.log("conexão encerrada");
               });
            }
            var produto = {};
            var array_produtos = [];
            // Iteração para ler os dados
            for (var i = 0; i < result.rows.length; i++) {
               produto = {
                  cod: result.rows[i].cd_produto,
                  nome: result.rows[i].nm_produto,
                  preco: result.rows[i].qt_preco
               }
               array_produtos.push(produto);
            }
            callback(array_produtos);
            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
      });
   },

   addItemListaCompras: function(userId, idProduto, callback) {

      const sql = "SELECT ("+userId+")";
      console.log(sql);
      var db = new pg.Client(configDB);

      db.connect(function (err) {
         
         if (err) throw err;
         
         db.query(sql, null, function (err, result) {
            if (err) {
               db.end(function (err) {
                  if (err) throw err; else console.log("conexão encerrada");
               });
            }
            callback(array_produtos);
            // disconnect the client
            db.end(function (err) {
               if (err) throw err; else console.log("conexão encerrada");
            });
         });
      });
   }

};
