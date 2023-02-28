import { OrderData } from '../OrderData';

export class GetOrder {
  constructor( private readonly orderData: OrderData) {}

  async execute({ cpf }: { cpf: string }): Promise<any> {
    const order = await this.orderData.getOrder(cpf);
    return order;
  }
}