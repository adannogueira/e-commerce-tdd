import axios from "axios";
import { CatalogGateway } from "./CatalogGateway";
import { Product } from "../../domain/entities/Product";

export class CatalogGatewayHttp implements CatalogGateway {
  async getProduct(idProduct: number): Promise<Product> {
    const response = await axios.get(`http://localhost:3002/product/${idProduct}`);
    const productData = response.data;
    if (!productData?.idProduct && productData?.status !== 200) throw new Error(productData.message)
    return new Product(productData)
  }
}
