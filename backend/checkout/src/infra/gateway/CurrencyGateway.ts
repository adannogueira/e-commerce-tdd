import { Currencies } from '../../domain/entities/Currencies';

export class CurrencyGateway {
  async getCurrencies (): Promise<Currencies> {
    const currencies = new Currencies();
    currencies.addCurrency('USD', 3 + Math.random());
    currencies.addCurrency('BRL', 1);
    return currencies;
  }
}
