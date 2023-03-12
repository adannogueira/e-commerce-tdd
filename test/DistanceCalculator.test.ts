import { Coordinates } from '../src/domain/entities/Coordinates';
import { DistanceCalculator } from '../src/domain/entities/DistanceCalculator';

test('Deve calcular a distância entre duas coordenadas', () => {
	const to = Coordinates.create({ latitude: -27.5945, longitude: -48.5477 });
	const from = Coordinates.create({ latitude: -22.9129, longitude: -43.2003 });
	const distance = DistanceCalculator.calculate(from, to);
	expect(distance).toBe(748.2217780081631);
});