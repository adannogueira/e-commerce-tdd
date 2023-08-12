import { Product } from '../entities/Product';

export interface ProductData {
  getProduct(idProduct: number): Promise<Product | null>
  listProducts(): Promise<Product[]>
}
