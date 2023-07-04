import { Database } from '../../checkout/src/infra/data/Database';
import { CalculateFreight } from '../../checkout/src/application/CalculateFreight'; 
import { SqLiteConnection } from '../../checkout/src/infra/database/SqLiteConnection';

const database = new Database(new SqLiteConnection());
const simulateFreight = new CalculateFreight(database, database);
const DEFAULT_CEP = '29560-000';

describe('CalculateFreight', () => {
	
	test("Não deve ter valor de frete menor que $10 por produto", async function () {
		const input = [
			{ idProduct: 1, quantity: 1 }
		];
		const freight = await simulateFreight.execute(input, DEFAULT_CEP, DEFAULT_CEP);
		expect(freight).toBe(10);
	});

	test("Deve calcular valor de frete com base nos CEPs de origem e destino", async function () {
		const from = '29560-000'
		const to = '29060-090'
		const items = [
			{ idProduct: 2, quantity: 1 }
		];
		const freight = await simulateFreight.execute(items, from, to);
		expect(freight).toBe(62);
	});
});
