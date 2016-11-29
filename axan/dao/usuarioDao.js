module.exports = {

   autenticar: function(hashUser, hashPassword, salt) {
      
      const myHashUser = 'qEQdQYXYJifU2BUgtedtnrsNpwxiX31esbz+wMiQr8d+PkpM9fUNCe+0oFSY9Lt5aSAFUUfBWZ4ZnK34Ex42qQ==';
      const myHashPass = 'IwefSyLkoJ0AllUupvdM+JZFEmrPQ9Zzo8dZa0ge1nID8BrH7rn9OEM6f8ndjfmms3k01ScWQqyuhyqNH5eaAw==';

      //buscar por esses hashs no banco no mesmo registro
      //se achar 
      /* retornar
         {
            "id": "1111111111",
            "nome": "Batinha",
            "tipo": "ADMIN"
         }
      */

      if (myHashUser === hashUser && myHashPass === hashPassword) {
         return {
            id: "1111111111",
            nome: "Batinha",
            tipo: "ADMIN"
         }
      }
      
      return undefined;

   },

   cadastar: function(hashUser, hashPassword, users_salt, passwords_salt, name) {
      console.log('cadastrando usuário ' + name + '...');
      console.log('userHash      : ' + hashUser);
      console.log('passwordHash  : ' + hashPassword);
      console.log('users_salt    : ' + users_salt);
      console.log('passwords_salt: ' + passwords_salt);

      return true;
   }

};
