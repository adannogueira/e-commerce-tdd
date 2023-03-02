export class Coupon {
  private readonly code: string;
  private readonly expireDate: Date;
  private readonly percentage: number;

  constructor({
    code,
    expireDate,
    percentage
  }: props) {
    this.code = code;
    this.expireDate = expireDate;
    this.percentage = percentage;
  }

  isExpired(): boolean {
    const today = new Date();
    return today.getTime() > this.expireDate.getTime();
  }

  getDiscount(total: number): number {
    if (this.isExpired()) return 0;
    return (total * this.percentage) / 100;
  }
}

type props = {
  code: string,
  expireDate: Date,
  percentage: number
}
