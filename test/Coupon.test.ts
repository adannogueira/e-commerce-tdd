import { Coupon } from '../src/Coupon';

jest.useFakeTimers().setSystemTime(new Date('2023/01/01'));

describe('Coupon', () => {
  it('Should instantiate a Coupon', () => {
    const coupon = new Coupon(new Date());

    expect(coupon).toBeInstanceOf(Object);
  });

  it.each([
    [new Date(), false],
    [new Date('2022/01/01'), true]
  ])('Should validate Coupon expiration', (expiration, expected) => {
    const coupon = new Coupon(expiration);

    expect(coupon.isExpired()).toBe(expected);
  });
});
