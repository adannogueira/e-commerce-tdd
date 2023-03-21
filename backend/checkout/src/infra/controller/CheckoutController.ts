import { Checkout } from '../../application/Checkout';
import { HttpServer } from '../http/HttpServer';

export class CheckoutController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly checkout: Checkout
  ) {
    httpServer.on('post', '/checkout', async function (params: any, body: any) {
      const output = await checkout.execute(body);
      return output;
    })
  }
}