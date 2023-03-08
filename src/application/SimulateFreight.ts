import { ProductData } from '../domain/data/ProductData';
import { FreightCalculator } from '../domain/entities/FreightCalculator';

export class SimulateFreight {
  constructor(private readonly productData: ProductData) {}

  async execute(items: { idProduct: number, quantity: number }[]) {
    let freight = 0;
    for (const item of items) {
      const product = await this.productData.getProduct(item.idProduct);
      if (!product) throw new Error('Product not found')
      freight += FreightCalculator.calculate(product)
    }
    return freight;
  }
}