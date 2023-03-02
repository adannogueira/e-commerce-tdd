export class Coupon {
  constructor(
    //private readonly code: string,
    private readonly expireDate: Date,
    //private readonly percentage: number
  ) {}

  isExpired(): boolean {
    const today = new Date();
    return today.getTime() > this.expireDate.getTime();
  }
/*
  getDiscount(total: number): number {
    return (total * this.percentage) / 100;
  } */
}

// fazer os testes dessa classe