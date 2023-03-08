import { Order } from '../entities/Order';

export interface OrderData {
  addOrder(data: Order): Promise<void>;
  getLastOrder(): Promise<number>;
  getOrder(cpf: string): Promise<any>
}
