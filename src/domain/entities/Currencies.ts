export class Currencies {
  public values: { [currency: string]: number } = {};

  public addCurrency(code: string, rate: number): void {
    this.values[code] = rate;
  }

  public getCurrency(code: string): number {
    return this.values[code];
  }
}