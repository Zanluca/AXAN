module.exports = {

   autenticar: function(hashUser, hashPassword) {
      
      const myHashUser = '/f6/g96q+ejeRcesEeim4j/9M3ZyBgifzO3DaF0UPNEqsWOGFxv8wj6QkY4A/6osjgQADOGBuHPH9vxu8E1NbQ==';
      const myHashPass = 'oFUHCNqctNSCRzX+IxX/1l9kqIE/72+xxb55HytGwFEhdVFc4+Z9Fjb3FLAWLSUjfSrsNy+iZrupXZUhPx13vQ==';

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

   cadastar: function(hashUser, hashPassword, name) {
      console.log('cadastrando usuário...');
      console.log('userHash     : ' + hashUser);
      console.log('passwordHash : ' + hashPassword);
   }

};
