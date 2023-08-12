import { ListProducts } from '../../src/application/ListProducts';
import { ProductData } from '../../src/domain/data/ProductData';
import { Product } from '../../src/domain/entities/Product';

class ProductDatabase implements ProductData {
	getProduct(idProduct: number): Promise<Product | null> {
		throw new Error('Method not implemented.');
	}
	listProducts(): Promise<Product[]> {
		return Promise.resolve([
			new Product({ idProduct: 1,	description: 'A', price: 1000, width: 50, height:50, length: 50, weight: 5 }),
			new Product({ idProduct: 2,	description: 'B',	price: 1000, width: 50,	height:50, length: 50, weight: 5 })
		]);
	}
}

describe('ListProducts', () => {
	test("should list all products", async function () {
		const productData = new ProductDatabase();
		const listProducts = new ListProducts(productData);
		const response = await listProducts.execute();
		expect(response).toHaveLength(2);
	});
});
