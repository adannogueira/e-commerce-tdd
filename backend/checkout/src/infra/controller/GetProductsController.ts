import { ListProducts } from '../../application/ListProducts';
import { HttpServer } from '../http/HttpServer';

export class GetProductsController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly listProducts: ListProducts
  ) {
    httpServer.on('get', '/products', async function () {
      const output = await listProducts.execute();
      return output;
    })
  }
}