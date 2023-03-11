import { Order } from '../domain/entities/Order';
import { OrderData } from '../domain/data/OrderData';

export class ListOrdersByCpf {
  constructor( private readonly orderData: OrderData) {}

  async execute(cpf: string): Promise<Order[]> {
    const order = await this.orderData.listOrders({ cpf });
    return order;
  }
}