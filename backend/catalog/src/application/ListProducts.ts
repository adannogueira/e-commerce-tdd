import { ProductData } from '../domain/data/ProductData';

export class ListProducts {
	constructor(
		private readonly productData: ProductData,
	) {}

	public async execute () {
		const products = await this.productData.listProducts();
		return products;
	}
}
