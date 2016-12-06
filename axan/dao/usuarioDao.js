var pg = require('pg');
const configDB = require('./configDB');

module.exports = {

   autenticar: function(hashUser, hashPassword, salt) {
      
      const myHashUser = 'qEQdQYXYJifU2BUgtedtnrsNpwxiX31esbz+wMiQr8d+PkpM9fUNCe+0oFSY9Lt5aSAFUUfBWZ4ZnK34Ex42qQ==';
      const myHashPass = 'IwefSyLkoJ0AllUupvdM+JZFEmrPQ9Zzo8dZa0ge1nID8BrH7rn9OEM6f8ndjfmms3k01ScWQqyuhyqNH5eaAw==';
      
      
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
      });;
   },

};
