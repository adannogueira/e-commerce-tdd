import { Product } from './Product';

export class FreightCalculator {
  static calculate(product: Product, distance: number) {
    const frete = (distance * product.calculateVolume() * (product.calculateDensity() / 100));
    return frete > 10 ? Math.round(frete * 100) / 100 : 10;
  }
}