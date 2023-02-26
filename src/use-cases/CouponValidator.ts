import { CouponData } from '../CouponData';

export class CouponValidator {
  constructor(private readonly couponData: CouponData) {}

  async validate (coupon: string): Promise<{ isValid: boolean }> {
		if (coupon) {
			const existingCoupon = await this.couponData.getCoupon(coupon);
			if (existingCoupon && new Date(existingCoupon.expiresIn) >= new Date()) {
				return { isValid: true };
			}
    }
    return { isValid: false };
  }
}