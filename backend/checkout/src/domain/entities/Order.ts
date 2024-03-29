import { Coupon } from './Coupon';
import { Cpf } from './Cpf';
import { Item } from './Item';
import { OrderCode } from './OrderCode';
import { Product } from './Product';

export class Order {
  readonly cpf: Cpf;
  readonly orderCode: OrderCode;
  private items: Item[];
  private coupon?: Coupon;
  private freight = 0;

  public constructor(cpf: string, sequence: number) {
    this.cpf = new Cpf(cpf);
    this.orderCode = new OrderCode({ orderDate: new Date(), sequence });
    this.items = [];
  }

  public addItem(
    product: Product,
    quantity: number,
    currencyCode: string = 'BRL',
    currencyValue: number = 1): void {
    if (this.items.find(item => item.idProduct === product.idProduct)) {
      throw new Error('Invalid cart');
    }
    this.items.push(new Item(product.idProduct, product.price, quantity, currencyCode, currencyValue));
  }

  public addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) this.coupon = coupon;
  }

  public addFreight(value: number): void {
    this.freight += value;
  }

  public getCpf(): string {
    return this.cpf.getValue();
  }

  public getCode(): string {
    return this.orderCode.getCode();
  }

  public getTotal(): number {
    const total = this.items.reduce((total, item) => {
      return total + item.getTotal();
    }, 0);
    const discount = this.coupon?.getDiscount(total) ?? 0;

    return total - discount + this.freight;
  }
}