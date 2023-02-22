export class CurrencyGateway {
  async getCurrencies () {
    return { USD: 3 + Math.random(), BRL: 1 }
  }
}
