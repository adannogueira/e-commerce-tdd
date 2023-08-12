import axios from "axios";

test("Deve listar produtos", async function () {
	const response = await axios.get("http://localhost:3002/products")
	const output = response.data;
	expect(output).toHaveLength(4);
});

test("Deve busca um produto pelo id", async function () {
	const response = await axios.get("http://localhost:3002/product/1")
	const output = response.data;
	expect(output.idProduct).toBe(1);
});