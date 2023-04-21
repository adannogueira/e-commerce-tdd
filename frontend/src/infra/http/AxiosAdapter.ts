import axios from 'axios';
import { HttpClient } from './HttpClient';

export class AxiosAdapter implements HttpClient {
  public async get(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
  public async post(url: string, data: any): Promise<any> {
    const response = await axios.post(url, data);
    return response.data;
  }
}