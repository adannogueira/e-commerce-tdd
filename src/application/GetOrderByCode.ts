import { OrderData } from '../domain/data/OrderData';

export class GetOrderByCode {
  constructor( private readonly orderData: OrderData) {}

  async execute(code: string) {
    const order = await this.orderData.getOrder({ code });
    return {
      cpf: order.getCpf(),
      code: order.getCode(),
      total: order.getTotal()
    };
  }
}