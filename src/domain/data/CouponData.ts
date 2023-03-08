import { Coupon } from '../entities/Coupon';

export interface CouponData {
  getCoupon(coupon: string): Promise<Coupon | null>
}