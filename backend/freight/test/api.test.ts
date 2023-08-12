import axios from "axios";

test("Deve calcular o frete corretamente", async function () {
	const input = {
		from: '29560-000',
		to: '29060-090',
		items: [{ volume: 0.09999, density: 400, quantity: 1 }]
	};
	const response = await axios.post("http://localhost:3001/calculateFreight", input)
	expect(response.status).toBe(200);
	const output = response.data;
	expect(output).toBe(62);
});
