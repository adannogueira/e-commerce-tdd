import { Product } from './Product';

export interface ProductData {
  getProduct(idProduct: number): Promise<Product | null>
}
