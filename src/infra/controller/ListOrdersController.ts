import { ListOrdersByCpf } from '../../application/ListOrdersByCpf';
import { HttpServer } from '../http/HttpServer';

export class ListOrdersController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly listOrders: ListOrdersByCpf
  ) {
    httpServer.on('get', '/:clientCpf/orders', async function (params: any) {
      const output = await listOrders.execute(params.clientCpf);
      return output;
    })
  }
}