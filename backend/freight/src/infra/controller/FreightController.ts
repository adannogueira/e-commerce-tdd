import { CalculateFreight } from '../../application/CalculateFreight';
import { HttpServer } from '../http/HttpServer';

export class FreightController {
  public constructor(
    private readonly httpServer: HttpServer,
    private readonly calculateFreight: CalculateFreight
  ) {
    httpServer.on('post', '/calculateFreight', async function (params: any, body: any) {
      const output = await calculateFreight.execute(body);
      return output;
    })
  }
}