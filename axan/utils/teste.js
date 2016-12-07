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

console.log(JSON.stringify(cliente));
console.log(JSON.stringify(funcionario));