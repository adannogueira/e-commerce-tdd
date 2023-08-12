import { GetProduct } from '../../application/GetProduct';
import { HttpServer } from '../http/HttpServer';

export class GetProductController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly getProduct: GetProduct
  ) {
    httpServer.on('get', '/product/:id', async function (params: any) {
      try {
        const output = await getProduct.execute({ productId: params.id });
        if (!output) throw new Error('Product not found');
        return output;
      } catch (error: any) {    
        return { status: 422, message: error.message };
      }
    })
  }
}