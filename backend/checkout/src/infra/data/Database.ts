import { CouponData } from '../../domain/data/CouponData';
import { Coupon } from '../../domain/entities/Coupon';
import { Order } from '../../domain/entities/Order';
import { OrderData } from '../../domain/data/OrderData';
import { Connection } from '../database/Connection';

export class Database implements CouponData, OrderData {
  public constructor(private readonly connection: Connection) {}

  public async getCoupon(coupon: string): Promise<Coupon | null> {
    try {
      const [{ code, expiresIn, percentage }] = await this.connection.query(`select * from coupon where code = '${coupon}'`);
      return new Coupon({ code, percentage: parseFloat(percentage), expiresIn: new Date(expiresIn) });
    } catch (error) {
      return null;
    }
  }

  public async addOrder(order: Order): Promise<void> {
    await this.connection.query(`
      insert into 'order' (
        code,
        cpf,
        issue_date,
        total
      ) values (
        '${order.getCode()}',
        '${order.cpf.getValue()}',
        'now()',
        '${order.getTotal()}'
      )
    `);

  }

  public async getLastOrder(): Promise<number> {
    const result = await this.connection.query(`select id_order from 'order' order by oid desc limit 1`);
    return result?.[0]?.id || 0;
  }

  public async getOrder({ code }: { code?: string }): Promise<Order> {
    try {
      const [result] = await this.connection.query(`select * from 'order' where code = '${code}'`);
      const order = new Order(result.cpf, result.code.match(/^\d{4}0+(\d+)/)[1])
      return order;
    } catch (error) {
      throw new Error();
    }
  }

  public async listOrders({ cpf }: { cpf: string }): Promise<Order[]> {
    try {
      const result = await this.connection.query(`select * from 'order' where cpf = '${cpf}'`);
      const orders = result.map((order: any) => new Order(order.cpf, order.code.match(/^\d{4}0+(\d+)/)[1]));
      return orders;
    } catch (error) {
      throw new Error(`Error consulting orders from cpf: ${cpf}`);
    }
  }
}
