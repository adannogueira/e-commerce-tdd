import { Coupon } from './Coupon';

export interface CouponData {
  getCoupon(coupon: string): Promise<Coupon | null>
}