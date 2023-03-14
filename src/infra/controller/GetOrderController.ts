import { GetOrderByCode } from '../../application/GetOrderByCode';
import { HttpServer } from '../http/HttpServer';

export class GetOrderController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly getOrder: GetOrderByCode
  ) {
    httpServer.on('get', '/order/:orderCode', async function (params: any) {
      const output = await getOrder.execute(params.orderCode);
      return output;
    })
  }
}