export class FreightCalculator {
  static calculate(volume: number, density: number, distance: number, quantity: number) {
    const freteUnidade = (distance * volume * (density / 100));
    const frete = freteUnidade * quantity;
    return frete > 10 ? Math.round(frete) : 10;
  }
}