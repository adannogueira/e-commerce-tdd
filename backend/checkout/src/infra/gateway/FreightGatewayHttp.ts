import axios from "axios";
import { FreightGateway, FreightParams } from "./FreightGateway";

export class FreightGatewayHttp implements FreightGateway {
  async calculateFreight(params: FreightParams): Promise<number> {
    const response = await axios.post('http://localhost:3001/calculateFreight', params);
    return response.data;
  }
}
