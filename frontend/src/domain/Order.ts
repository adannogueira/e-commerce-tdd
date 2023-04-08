export class Order {
  private items: any[]
  private code = ''
  private total = 0

  public constructor(private readonly cpf: string, private readonly cep: string) {
    this.items = []
  }

  public addItem(product: any) {
    const existingItem = this.items.find((item: any) => item.idProduct === product.idProduct)
    if (existingItem) {
      existingItem.quantity++
    } else {
      this.items.push({ idProduct: product.idProduct, price: product.price, quantity: 1 })
    }
  }

  public deleteItem(idProduct: number) {
    const existingItem = this.items.find((item: any) => item.idProduct === idProduct)
    if (existingItem) {
      existingItem.quantity--
    } else {
      this.items = this.items.filter((item: any) => item.idProduct !== idProduct)
    }
  }

  public getTotal() {
    const total = this.items.reduce(
      (total: number, item: any) => total + item.price * item.quantity, 0
    )
    return this.formatMoney(total)
  }

  public formatMoney(amount: number) {
    const [integerPart, decimalPart] = amount.toFixed(2).split(".");
    const integerPartWithSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${integerPartWithSeparator},${decimalPart}`;
  }
}