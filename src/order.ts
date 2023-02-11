import { Cpf } from './cpf'
import { Product } from './product'

export class Order {
  readonly cpf: Cpf
  private items: Product[] = []
  private discount: number = 0
  
  constructor(cpf: string) {
    this.cpf = new Cpf(cpf)
  }

  addProduct (product: Product.Params): void {
    this.items.push(new Product(product))
  }

  currentItemCount (): number {
    return this.items.length
  }

  addDiscountPercent (discount: number): void {
    this.discount = discount
  }

  getTotalValue (): number {
    const grossValue = this.items.reduce((total, item) => total += item.price * item.quantity, 0)
    const totalValue = this.discount ? grossValue - (grossValue * (this.discount / 100)) : grossValue
    return Number(totalValue.toFixed(2))
  }
}