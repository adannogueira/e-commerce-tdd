import { FreightGateway, FreightParams } from "./FreightGateway";

export class MemoryFreightGateway implements FreightGateway {
  async calculateFreight(params: FreightParams): Promise<number> {
    return Promise.resolve(10)
  }
}