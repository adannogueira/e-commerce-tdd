import { Order } from '../domain/entities/Order';
import { OrderData } from '../domain/data/OrderData';

export class GetOrder {
  constructor( private readonly orderData: OrderData) {}

  async execute({ cpf }: { cpf: string }): Promise<Order> {
    const order = await this.orderData.getOrder(cpf);
    return order;
  }
}