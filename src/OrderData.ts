export interface OrderData {
  addOrder({ code, order }: { code: string, order: string }): Promise<any>;
  getLastOrder(): Promise<number>;
}