import { Cpf } from './Cpf';

export class Order {
  private readonly cpf: Cpf;

  public constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }

  public getTotal(): number {
    return 0;
  }
}