export class Item {
  public constructor(
    readonly idProduct: number,
    readonly price: number,
    readonly quantity: number,
    readonly currencyCode: string = 'BRL',
    readonly currencyValue: number = 1
  ) {
    if (quantity < 1) throw new Error('Invalid product quantity');
  }

  public getTotal(): number {
    return this.price * this.quantity * this.currencyValue;
  }
}