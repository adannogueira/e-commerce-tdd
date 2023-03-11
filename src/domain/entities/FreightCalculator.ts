import { Product } from './Product';

export class FreightCalculator {
  static calculate(product: Product) {
    if (product.weight < 0) {
      throw new Error('Invalid product weight');
    }
    const frete = (1000 * product.calculateVolume() * (product.calculateDensity() / 100));
    return frete > 10 ? Math.round(frete) : 10;
  }
}