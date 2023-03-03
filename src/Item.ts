export class Item {
  public constructor(
    readonly idProduct: number,
    readonly price: number,
    readonly quantity: number
  ) {
    if (quantity < 1) throw new Error('Invalid product quantity');
  }

  public getTotal(): number {
    return this.price * this.quantity;
  }
}