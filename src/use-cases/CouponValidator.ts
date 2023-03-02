import { Coupon } from '../Coupon';
import { CouponData } from '../CouponData';

export class CouponValidator {
  constructor(private readonly couponData: CouponData) {}

  async validate (
    total: number,
    couponData?: string
  ): Promise<{ isValid: boolean, discount: number }> {
		if (couponData) {
			const existingCoupon = await this.couponData.getCoupon(couponData);
			if (existingCoupon) {
        const coupon = new Coupon(existingCoupon)
				return { isValid: !coupon.isExpired(), discount: coupon.getDiscount(total) };
			}
    }
    return { isValid: false, discount: 0 };
  }
}
