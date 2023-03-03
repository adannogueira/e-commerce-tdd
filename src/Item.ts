export class Item {
  public constructor(
    readonly idProduct: number,
    readonly price: number,
    readonly quantity: number
  ) {}

  public getTotal(): number {
    return this.price * this.quantity;
  }
}