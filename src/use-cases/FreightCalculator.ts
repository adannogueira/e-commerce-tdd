import { Product, ProductData } from '../ProductData';

export class FreightCalculator {
  constructor(private readonly productData: ProductData) {}

  async execute(items: { idProduct: number, quantity: number }[]) {
    let freight = 0;
    for (const item of items) {
      const product = await this.productData.getProduct(item.idProduct);
      if (!product) throw new Error('Product not found')
      if (product.largura < 0 || product.altura < 0 || product.profundidade < 0) {
        throw new Error('Invalid product dimension');
      }
      if (product.peso < 0) {
        throw new Error('Invalid product weight');
      }
      const volume = (product.largura * product.altura * product.profundidade) * 0.000001;
      const densidade = product.peso / volume;
      const frete = (1000 * volume * (densidade / 100)) * item.quantity;
      freight += frete > 10 ? Math.round(frete) : 10;
    }
    return freight;
  }
}