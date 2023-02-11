export class Product {
  readonly description: string
  readonly price: number
  readonly quantity: number

  constructor ({ description, price, quantity }: Product.Params) {
    if (!price) throw new Error('Invalid Price')
    if (!quantity) throw new Error('Invalid Quantity')
    this.description = description || ''
    this.price = price
    this.quantity = quantity
  }
}

export namespace Product {
  export interface Params {
    description: string
    price: number
    quantity: number
  }
}