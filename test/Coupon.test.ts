import { Coupon } from '../src/Coupon';

jest.useFakeTimers().setSystemTime(new Date('2023/01/01'));

describe('Coupon', () => {
  it('Should instantiate a Coupon', () => {
    const coupon = new Coupon({ code: 'COUPON', expireDate: new Date(), percentage: 10 });

    expect(coupon).toBeInstanceOf(Object);
  });

  it.each([
    [new Date(), false],
    [new Date('2022/01/01'), true]
  ])('Should validate Coupon expiration', (expireDate, expected) => {
    const coupon = new Coupon({ code: 'COUPON', expireDate, percentage: 10 });

    expect(coupon.isExpired()).toBe(expected);
  });

  it('Should apply a discount percentage to a received value', () => {
    const coupon = new Coupon({ code: 'COUPON', expireDate: new Date(), percentage: 10 });
    const total = 1000;

    const discountValue = coupon.getDiscount(total);

    expect(discountValue).toBe(100);
  });

  it('Should not apply a discount percentage when coupon is expired', () => {
    const coupon = new Coupon({
      code: 'COUPON',
      expireDate: new Date('2022/01/01'),
      percentage: 10
    });
    const total = 1000;

    const discountValue = coupon.getDiscount(total);

    expect(discountValue).toBe(0);
  });
});

