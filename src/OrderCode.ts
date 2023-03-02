export class OrderCode {
  readonly orderDate: Date;
  readonly sequence: number;
  private readonly code: string;

  public constructor({ orderDate, sequence }: any) {
    this.orderDate = orderDate;
    this.sequence = sequence;
    this.code = `${orderDate.getFullYear()}${(sequence).toString().padStart(8, '0')}`;
  }

  public getCode(): string {
    return this.code;
  }
}