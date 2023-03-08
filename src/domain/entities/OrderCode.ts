export class OrderCode {
  readonly orderDate: Date;
  readonly sequence: number;
  private readonly code: string;

  public constructor({ orderDate, sequence }: { orderDate: Date, sequence: number }) {
    if (sequence < 1) throw new Error('Invalid sequence');
    this.orderDate = orderDate;
    this.sequence = sequence;
    this.code = `${orderDate.getFullYear()}${(sequence).toString().padStart(8, '0')}`;
  }

  public getCode(): string {
    return this.code;
  }
}