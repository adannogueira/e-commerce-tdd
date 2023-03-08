export class Coupon {
  private readonly code: string;
  private readonly expiresIn: Date;
  private readonly percentage: number;

  constructor({
    code,
    expiresIn,
    percentage
  }: props) {
    this.code = code;
    this.expiresIn = expiresIn;
    this.percentage = percentage;
  }

  isExpired(): boolean {
    const today = new Date();
    return today.getTime() > this.expiresIn.getTime();
  }

  getDiscount(total: number): number {
    if (this.isExpired()) return 0;
    return (total * this.percentage) / 100;
  }
}

type props = {
  code: string,
  expiresIn: Date,
  percentage: number
}
