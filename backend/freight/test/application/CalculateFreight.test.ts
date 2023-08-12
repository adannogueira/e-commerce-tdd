import { CalculateFreight } from '../../src/application/CalculateFreight'; 
import { SqLiteConnection } from '../../../freight/src/infra/database/SqLiteConnection';
import { Database } from '../../src/infra/data/Database';

const database = new Database(new SqLiteConnection());
const calculateFreight = new CalculateFreight(database);
const DEFAULT_CEP = '29560-000';

describe('CalculateFreight', () => {
	test("Não deve ter valor de frete menor que $10 por produto", async function () {
		const params = {
			from: DEFAULT_CEP,
			to: DEFAULT_CEP,
			items: [{ volume: 0.00015, density: 6666.67, quantity: 1 }]
		};
		const freight = await calculateFreight.execute(params);
		expect(freight).toBe(10);
	});

	test("Deve calcular valor de frete com base nos CEPs de origem e destino", async function () {
		const params = {
			from: DEFAULT_CEP,
			to: '29060-090',
			items: [{ volume: 0.09999, density: 400, quantity: 1 }]
		};
		const freight = await calculateFreight.execute(params);
		expect(freight).toBe(62);
	});
});
