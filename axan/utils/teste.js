// https://www.npmjs.com/package/jasstor

const cliente = {
		email: "joao@gmail.com",
		phone: {
			country: "055",
			ddd: "047",
			number: "999999999"
		},
		dateOfBirth: "28/04/1995",
		type: "client"
};

const funcionario = {
		email: "tamire@gmail.com",
		phone: {
			country: "055",
			ddd: "047",
			number: "111111111"
		},
		dateOfBirth: "21/07/1996",
		type: "admin"
};

const produto1 = {
   nome: "Açucar 1Kg",
   preco: 6.20, 
   cod_cnpj: "12378965400"
};

const produto2 = {
   nome: "Nescau 1Kg",
   preco: 9.20, 
   cod_cnpj: "12378965400"
};



console.log(JSON.stringify(cliente));
console.log(JSON.stringify(funcionario));
console.log(JSON.stringify(produto1));
console.log(JSON.stringify(produto2));