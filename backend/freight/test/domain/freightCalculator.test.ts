import { FreightCalculator } from '../../src/domain/entities/FreightCalculator'
const DEFAULT_DISTANCE = 1000;
const DEFAULT_VOLUME = 0.09999;
const DEFAULT_DENSITY = 400;

describe('FreightCalculator', () => {
	test("Não deve ter valor de frete menor que $10", function () {
		const freight = FreightCalculator.calculate(0.00015, 6666.67, DEFAULT_DISTANCE, 1);
		expect(freight).toBe(10);
	});
	
	test("Deve calcular valor de frete com base nos produtos", function () {
		const freight = FreightCalculator.calculate(DEFAULT_VOLUME, DEFAULT_DENSITY, DEFAULT_DISTANCE, 1);
		expect(freight).toBe(400);
	});

	test.each([
		[1, 400], [2, 800], [3, 1200]
	])("Deve calcular valor de frete com base na quantidade", function (quantity, expectedFreight) {
		const freight = FreightCalculator.calculate(DEFAULT_VOLUME, DEFAULT_DENSITY, DEFAULT_DISTANCE, quantity);
		expect(freight).toBe(expectedFreight);
	});

	test.each([
		[1000, 400],
		[2000, 800]
	])("Deve calcular valor de frete com base na distância", function (distance, expectedFreight) {
		const freight = FreightCalculator.calculate(DEFAULT_VOLUME, DEFAULT_DENSITY, distance, 1);
		expect(freight).toBe(expectedFreight);
	});
});
