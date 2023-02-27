import { Product } from '../ProductData';

export class FreightCalculator {
  execute(product: Product) {
    if (product.largura < 0 || product.altura < 0 || product.profundidade < 0) {
      throw new Error("Invalid product dimension");
    }
    if (product.peso < 0) {
      throw new Error("Invalid product weight");
    }
    const volume = (product.largura * product.altura * product.profundidade) * 0.000001;
    const densidade = product.peso / volume;
    const frete = 1000 * volume * (densidade / 100);
    return frete > 10 ? frete : 10;
  }
}