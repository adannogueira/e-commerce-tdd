export interface OrderData {
  addOrder(data: Order): Promise<any>;
  getLastOrder(): Promise<number>;
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
