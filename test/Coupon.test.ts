import { Coupon } from '../src/Coupon';

describe('Coupon', () => {
  it('Should instantiate a Coupon', () => {
    const coupon = new Coupon();

    expect(coupon).toBeInstanceOf(Object);
  });
});
