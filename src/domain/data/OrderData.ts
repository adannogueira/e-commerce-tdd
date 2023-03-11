import { Order } from '../entities/Order';

export interface OrderData {
  addOrder(data: Order): Promise<void>;
  getLastOrder(): Promise<number>;
  getOrder(params: { cpf?: string, code?: string }): Promise<any>
}
