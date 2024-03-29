import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

const commonData = { cpf: '987.654.321-00', cep: '29500-000' };

test("Não deve fazer um pedido com cpf inválido", async function () {
	const input = {
		cpf: "987.654.321-01"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid CPF");
});

test("Deve fazer um pedido com 3 produtos", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(6584);
});

test("Não deve fazer pedido com produto que não existe", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 4, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Product not found");
});

test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(5366);
});

test("Não deve aplicar um cupom de desconto expirado", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE10"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(6584);
});

test("Não deve fazer um pedido com uma quantidade negativa de produtos", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: -1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid product quantity");
});

test("Não deve fazer um pedido quando um produto é informado mais de uma vez", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 1, quantity: 2 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid cart");
});

test("Não deve fazer um pedido quando alguma dimensão do produto é negativa", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 5, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid product dimension");
});

test("Não deve fazer um pedido quando o peso do produto é negativo", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 6, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid product weight");
});

test("Não deve ter valor de frete menor que $10", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 1, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(1010);
});

test("Deve calcular valor de frete com base nos produtos", async function () {
	const input = {
		...commonData,
		items: [
			{ idProduct: 2, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(5395);
});
