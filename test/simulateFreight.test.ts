import { Database } from '../src/infra/data/Database';
import { SimulateFreight } from '../src/application/SimulateFreight'; 
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';

const database = new Database(new SqLiteConnection());
const simulateFreight = new SimulateFreight(database);

describe('SimulateFreight', () => {
  test("Deve gerar exceção quando alguma dimensão do produto é negativa", async function () {
		const input = [
			{ idProduct: 5, quantity: 1 }
		];
		await expect(() => simulateFreight.execute(input)).rejects.toThrow("Invalid product dimension");
	});
	
	test("Deve gerar exceção quando o peso do produto é negativo", async function () {
		const input = [
			{ idProduct: 6, quantity: 1 }
		];
		await expect(() => simulateFreight.execute(input)).rejects.toThrow("Invalid product weight");
	});
	
	test("Não deve ter valor de frete menor que $10", async function () {
		const input = [
			{ idProduct: 1, quantity: 1 }
		];
		const freight = await simulateFreight.execute(input);
		expect(freight).toBe(10);
	});
	
	test("Deve calcular valor de frete com base nos produtos", async function () {
		const input = [
			{ idProduct: 2, quantity: 1 }
		];
		const freight = await simulateFreight.execute(input);
		expect(freight).toBe(400);
	});
});
