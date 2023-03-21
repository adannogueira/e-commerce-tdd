import { Order } from '../domain/entities/Order';
import { OrderData } from '../domain/data/OrderData';

export class ListOrdersByCpf {
  constructor( private readonly orderData: OrderData) {}

  async execute(cpf: string) {
    const orders = await this.orderData.listOrders({ cpf });
    return orders.map(order => ({
      code: order.getCode(),
      cpf: order.getCpf(),
      total: order.getTotal()
    }));
  }
}