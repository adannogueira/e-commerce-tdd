import { ProductData } from '../../domain/data/ProductData';
import { Product } from '../../domain/entities/Product';
import { Connection } from '../database/Connection';

export class Database implements ProductData {
  public constructor(private readonly connection: Connection) {}

  public async getProduct(idProduct: number): Promise<Product | null> {
    const [foundProduct] = await this.connection.query(`select * from product where id_product = ${idProduct}`);
    if (!foundProduct) return null
    return new Product({
      idProduct: foundProduct.id_product,
      description: foundProduct.description,
      price: parseFloat(foundProduct.price),
      width: parseFloat(foundProduct.width),
      height:parseFloat(foundProduct.height),
      length: parseFloat(foundProduct.length),
      weight: parseFloat(foundProduct.weight),
      currency: foundProduct.currency
    });
  }

  public async listProducts(): Promise<Product[]> {
    const result = await this.connection.query(`select * from product`);
    const products = result.map((product: any) => {
      try {
        return new Product({
          idProduct: product.id_product,
          description: product.description,
          price: parseFloat(product.price),
          width: parseFloat(product.width),
          height:parseFloat(product.height),
          length: parseFloat(product.length),
          weight: parseFloat(product.weight),
          currency: product.currency
        });
      } catch (e) {
        return
      }
    })
    return products.filter(Boolean)
  }

}
