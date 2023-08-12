import { ProductData } from '../domain/data/ProductData';

export class GetProduct {
	constructor(
		private readonly productData: ProductData,
	) {}

	public async execute ({ productId }: { productId: number }) {
		const product = await this.productData.getProduct(productId);
		return product;
	}
}
