export class Product {
  readonly idProduct: number;
  readonly description: string;
  readonly price: number;
  readonly width: number;
  readonly height: number;
  readonly length: number;
  readonly weight: number;
  readonly currency: string;

  public constructor({ idProduct, description, price, width, height, length, weight, currency }: Props) {
    this.validateProps({ height, width, weight })
    this.idProduct = idProduct;
    this.description = description;
    this.price = price;
    this.width = width;
    this.height = height;
    this.length = length;
    this.weight = weight;
    this.currency = currency ?? 'BRL';
  }

  public calculateVolume(): number {
    const volume = (this.height * this.length * this.width) * 0.000001;
    return volume;
  }

  public calculateDensity(): number {
    const density = this.weight / this.calculateVolume();
    return +density.toFixed(2);
  }

  private validateProps({ height, length, width, weight }: Record<string, number>): void {
    if (height < 0 || length < 0 || width < 0) {
      throw new Error('Invalid product dimension');
    };
    if (weight < 0) {
      throw new Error('Invalid product weight');
    }
  }
}

type Props = {
  readonly idProduct: number;
  readonly description: string;
  readonly price: number;
  readonly width: number;
  readonly height: number;
  readonly length: number;
  readonly weight: number;
  readonly currency?: string;
}