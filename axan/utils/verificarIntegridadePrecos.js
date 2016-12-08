var pg = require('pg');
const fs = require('fs');
var rand = require('generate-key');

var encrypt = require('./encryptData');
var decrypt = require('./decryptData');
const configDB = require('../dao/configDB');
const gerarHash = require('../utils/gerarHash');

const algorithm = 'aes-256-ctr';
const masterKey = fs.readFileSync('keys/master_key.prt', {encoding: 'utf8'});

// Utilizado para o algoritmo HASH do user e password
const algorithmHash = 'sha256';
const input_encoding = 'utf8';
const output_encoding_hash = 'base64';

module.exports = function (done) {

   // salt padrao utilizado como base para todos os preços 
   var salt = fs.readFileSync('keys/salt_preco.prt', {encoding: 'utf8'});
   salt = decrypt(salt, 'aes-256-ctr', masterKey, 'utf8', 'base64');

   // SQL para buscar os preços de todos os produtos
   var sql = "select cd_produto, nm_produto, qt_preco, hash_preco from produto";

   // Para armazenar os produtos não integros
   var array_produtos = [];

   // Criando instância do banco de dados com as configurações salvas
   var db = new pg.Client(configDB);
   // Conectando com o Banco de dados
   db.connect(function (err) {
      
      // Caso ocorra algum erro
      if (err) throw err;
      
      // Lendo os produtos cadastrados
      db.query(sql, null, function (err, result) {
         if (err) {
            db.end(function (err) {
               if (err) throw err; else console.log("Erro conexão encerrada");
            });
            throw err;
         }

         var produto = {};
         var hash = "";
         var saltAtual = "";

         // Iteração para ler os dados já armazenados
         for (var i = 0; i < result.rows.length; i++) {

            // Utiliza o id também para preços iguais gerarem hashs diferentes
            saltAtual = result.rows[i].cd_produto + salt;
            // Gerando o hash para o preço do produto
            hash = gerarHash(result.rows[i].qt_preco, algorithmHash, saltAtual, input_encoding, output_encoding_hash);
            // Salvando as informações em um vetor
            if (hash !== result.rows[i].hash_preco) {
               produto = {
                  cod: result.rows[i].cd_produto,
                  nome: result.rows[i].nm_produto,
                  preco: result.rows[i].qt_preco
               }
               array_produtos.push (produto);
               console.log("Produto com código: " + result.rows[i].cd_produto + " não está com o preço correto");
            }
         }

         // Desconectando do Banco de Dados
         db.end(function (err) {
            if (err) throw err; else console.log("conexão encerrada");
         });
         done(array_produtos);
      });
   });
};