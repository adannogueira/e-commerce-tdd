import { Order } from '../entities/Order';

export interface OrderData {
  addOrder(data: Order): Promise<void>;
  getLastOrder(): Promise<number>;
  getOrder(params: { code: string }): Promise<Order>
  listOrders(params: { cpf?: string }): Promise<Order[]>
}
