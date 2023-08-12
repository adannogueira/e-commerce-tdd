import { GetProduct } from '../../src/application/GetProduct';
import { ListProducts } from '../../src/application/ListProducts';
import { ProductData } from '../../src/domain/data/ProductData';
import { Product } from '../../src/domain/entities/Product';

class ProductDatabase implements ProductData {
	getProduct(idProduct: number): Promise<Product | null> {
		return Promise.resolve([
			new Product({ idProduct: 1,	description: 'A', price: 1000, width: 50, height:50, length: 50, weight: 5 }),
			new Product({ idProduct: 2,	description: 'B',	price: 1000, width: 50,	height:50, length: 50, weight: 5 })
		].find(product => product.idProduct === idProduct) ?? null);
	}

	listProducts(): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}
}

describe('GetProduct', () => {
	test("should get a product by id", async function () {
		const productData = new ProductDatabase();
		const getProduct = new GetProduct(productData);
		const response = await getProduct.execute({ productId: 2 });
		expect(response?.description).toBe('B');
	});
});
