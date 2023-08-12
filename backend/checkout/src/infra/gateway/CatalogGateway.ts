import { Product } from "../../domain/entities/Product";

export interface CatalogGateway {
  getProduct(idProduct: number): Promise<Product>
}
