import { FreightCalculator } from '../src/use-cases/FreightCalculator';

const freightCalculator = new FreightCalculator();

describe('FreightCalculator', () => {
  test("Deve gerar exceção quando alguma dimensão do produto é negativa", async function () {
		const input = {
			id_product: 5,
			description: 'D',
			price: 30,
			largura: -100,
			altura: 30,
			profundidade: 10,
			peso: 3,
			currency: 'BRL'
		};
		expect(() => freightCalculator.execute(input)).toThrow("Invalid product dimension");
	});
	
	test("Deve gerar exceção quando o peso do produto é negativo", async function () {
		const input = {
			id_product: 6,
			description: 'E',
			price: 30,
			largura: 100,
			altura: 30,
			profundidade: 10,
			peso: -3,
			currency: 'BRL'
		};
		expect(() => freightCalculator.execute(input)).toThrow("Invalid product weight");
	});
	
	test("Não deve ter valor de frete menor que $10", async function () {
		const input = {
			id_product: 1,
			description: 'Camera',
			price: 1000,
			largura: 20,
			altura: 15,
			profundidade: 10,
			peso: 1,
			currency: 'BRL'
		};
		const freight = freightCalculator.execute(input);
		expect(freight).toBe(10);
	});
	
	test("Deve calcular valor de frete com base nos produtos", async function () {
		const input = {
			id_product: 2,
			description: 'Geladeira',
			price: 5000,
			largura: 200,
			altura: 100,
			profundidade: 50,
			peso: 40,
			currency: 'BRL'
		};
		const freight = freightCalculator.execute(input);
		expect(freight).toBe(400);
	});
});
