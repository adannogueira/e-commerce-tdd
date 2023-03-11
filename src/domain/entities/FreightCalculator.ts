import { Product } from './Product';

export class FreightCalculator {
  static calculate(product: Product) {
    const frete = (1000 * product.calculateVolume() * (product.calculateDensity() / 100));
    return frete > 10 ? Math.round(frete) : 10;
  }
}