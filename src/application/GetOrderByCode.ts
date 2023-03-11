import { Order } from '../domain/entities/Order';
import { OrderData } from '../domain/data/OrderData';

export class GetOrderByCode {
  constructor( private readonly orderData: OrderData) {}

  async execute(code: string): Promise<Order> {
    const order = await this.orderData.getOrder({ code });
    return order;
  }
}