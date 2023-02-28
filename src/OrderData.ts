export interface OrderData {
  addOrder(data: Order): Promise<any>;
  getLastOrder(): Promise<number>;
  getOrder(cpf: string): Promise<any>
}

export type Order = {
  couponCode?: string,
  couponPercentage: number,
  code: string,
  cpf: string,
  email?: string,
  freight: number,
  total: number
};
