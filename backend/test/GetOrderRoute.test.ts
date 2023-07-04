import axios from 'axios';
import { Order } from '../checkout/src/domain/entities/Order';
import { Database } from '../src/infra/data/Database';
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';

axios.defaults.validateStatus = function () {
	return true;
}

test('Should return the requested order', async function () {
	// Arrange
	await makeOrder();
	const code = '202300000001';

	// Act
	const response = await axios.get(`http://localhost:3000/order/${code}`)

	// Assert
	expect(response.data.code).toBe(code);
});

const makeOrder = async (): Promise<void> => {
	const connection = new SqLiteConnection();
	const database = new Database(connection);
	database.addOrder(new Order('00000000191', 1));
};
