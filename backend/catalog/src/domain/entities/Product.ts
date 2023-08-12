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