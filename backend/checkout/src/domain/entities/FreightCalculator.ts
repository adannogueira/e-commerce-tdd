import { Product } from './Product';

export class FreightCalculator {
  static calculate(product: Product, distance: number, quantity: number) {
    const freteUnidade = (distance * product.calculateVolume() * (product.calculateDensity() / 100));
    const frete = freteUnidade * quantity;
    return frete > 10 ? Math.round(frete) : 10;
  }
}