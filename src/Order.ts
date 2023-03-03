import { Coupon } from './Coupon';
import { Cpf } from './Cpf';
import { Item } from './Item';
import { Product } from './Product';

export class Order {
  private readonly cpf: Cpf;
  private items: Item[];
  private coupon?: Coupon;

  public constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  public addItem(product: Product, quantity: number): void {
    if (this.items.find(item => item.idProduct === product.idProduct)) {
      throw new Error('Invalid cart');
    }
    this.items.push(new Item(product.idProduct, product.price, quantity));
  }

  public addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) this.coupon = coupon;
  }

  public getTotal(): number {
    const total = this.items.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
    const discount = this.coupon?.getDiscount(total) ?? 0;
    return total - discount || 0;
  }
}