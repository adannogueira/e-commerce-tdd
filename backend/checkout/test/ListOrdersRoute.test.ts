import axios from 'axios';

axios.defaults.validateStatus = function () {
	return true;
}

test('Should return all orders from given client', async function () {
	// Arrange
	await makeOrders();
	const clientCpf = '000.000.002-72';

	// Act
	const response = await axios.get(`http://localhost:3000/${clientCpf}/orders`)

	// Assert
	expect(response.data.map((item: any) => item.cpf)).toEqual([clientCpf, clientCpf]);
});

const makeOrders = async (): Promise<void> => {
	const cpf = '000.000.002-72';
	const input1 = {
		cpf,
		cep: '29560000',
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	const input2 = {
		cpf,
		cep: '29560-000',
		items: [{ idProduct: 2, quantity: 2 }]
	};
	await axios.post('http://localhost:3000/checkout', input1);
	await axios.post('http://localhost:3000/checkout', input2);
};
