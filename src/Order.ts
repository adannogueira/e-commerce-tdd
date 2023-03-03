import { Coupon } from './Coupon';
import { Cpf } from './Cpf';
import { Item } from './Item';
import { Product } from './Product';
import { FreightCalculator } from './use-cases/FreightCalculator';

export class Order {
  private readonly cpf: Cpf;
  private items: Item[];
  private coupon?: Coupon;
  private freight = 0;

  public constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  public addItem(product: Product, quantity: number): void {
    if (this.items.find(item => item.idProduct === product.idProduct)) {
      throw new Error('Invalid cart');
    }
    this.items.push(new Item(product.idProduct, product.price, quantity));
    this.freight += FreightCalculator.calculate(product);
  }

  public addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) this.coupon = coupon;
  }

  public getTotal(): number {
    const total = this.items.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
    const discount = this.coupon?.getDiscount(total) ?? 0;

    return total - discount + this.freight;
  }
}