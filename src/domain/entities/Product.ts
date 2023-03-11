export class Product {
  public constructor(
    readonly idProduct: number,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number,
    readonly currency: string = 'BRL'
  ) { }

  public calculateDensity(): number {
    const volume = (this.height * this.length * this.width) * 0.000001;
    const density = this.weight / volume;
    return +density.toFixed(2);
  }
}
