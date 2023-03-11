import { Order } from '../domain/entities/Order';
import { OrderData } from '../domain/data/OrderData';

export class GetOrder {
  constructor( private readonly orderData: OrderData) {}

  async execute({ cpf, code }: { cpf?: string, code?: string }): Promise<Order> {
    const order = await this.orderData.getOrder({ cpf, code });
    return order;
  }
}