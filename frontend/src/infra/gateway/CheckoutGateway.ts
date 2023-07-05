import { Product } from '../../domain/Product';

export interface CheckoutGateway {
  getProducts(): Promise<Product[]>
  checkout(input: any): Promise<any>
}