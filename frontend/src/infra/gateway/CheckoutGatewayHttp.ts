import { Product } from '../../domain/Product'
import { HttpClient } from '../http/HttpClient'
import { CheckoutGateway } from './CheckoutGateway'

export class CheckoutGatewayHttp implements CheckoutGateway {
  public constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string
  ) {}
  public async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get(`${this.baseUrl}/products`)
    return response.map(({ idProduct, description, price }: any) => new Product(idProduct, description, price))
  }

  public async checkout(input: any): Promise<any> {
    const response = await this.httpClient.post(`${this.baseUrl}/checkout`, input)
    return response
  }

}