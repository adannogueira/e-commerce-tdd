import { Coupon } from '../domain/entities/Coupon';
import { CouponData } from '../domain/data/CouponData';

export class CouponValidator {
  constructor(private readonly couponData: CouponData) {}

  async validate (
    total: number,
    couponData?: string
  ): Promise<{ isValid: boolean, discount: number }> {
		if (couponData) {
			const coupon = await this.couponData.getCoupon(couponData);
			if (coupon) {
				return { isValid: !coupon.isExpired(), discount: coupon.getDiscount(total) };
			}
    }
    return { isValid: false, discount: 0 };
  }
}
