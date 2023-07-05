import { FreightCalculator } from '../../checkout/src/domain/entities/FreightCalculator';
import { Product } from '../../checkout/src/domain/entities/Product';

const DEFAULT_DISTANCE = 1000;

describe('FreightCalculator', () => {
	test("Não deve ter valor de frete menor que $10", function () {
		const input = new Product({
			idProduct: 1,
			description: 'Camera',
			price: 1000,
			width: 20,
			height: 15,
			length: 10,
			weight: 1,
			currency: 'BRL'
		});
		const freight = FreightCalculator.calculate(input, DEFAULT_DISTANCE, 1);
		expect(freight).toBe(10);
	});
	
	test("Deve calcular valor de frete com base nos produtos", function () {
		const input = new Product({
			idProduct: 2,
			description: 'Geladeira',
			price: 5000,
			width: 200,
			height: 10,
			length: 50,
			weight: 40,
			currency: 'BRL'
		});
		const freight = FreightCalculator.calculate(input, DEFAULT_DISTANCE, 1);
		expect(freight).toBe(400);
	});

	test.each([
		[1, 400], [2, 800], [3, 1200]
	])("Deve calcular valor de frete com base na quantidade", function (quantity, expectedFreight) {
		const input = new Product({
			idProduct: 2,
			description: 'Geladeira',
			price: 5000,
			width: 200,
			height: 10,
			length: 50,
			weight: 40,
			currency: 'BRL'
		});
		const freight = FreightCalculator.calculate(input, DEFAULT_DISTANCE, quantity);
		expect(freight).toBe(expectedFreight);
	});

	test.each([
		[1000, 400],
		[2000, 800]
	])("Deve calcular valor de frete com base na distância", function (distance, expectedFreight) {
		const items = new Product({
			idProduct: 2,
			description: 'Geladeira',
			price: 5000,
			width: 200,
			height: 10,
			length: 50,
			weight: 40,
			currency: 'BRL'
		});
		const freight = FreightCalculator.calculate(items, distance, 1);
		expect(freight).toBe(expectedFreight);
	});
});
