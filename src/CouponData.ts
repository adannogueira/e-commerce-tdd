export interface CouponData {
  getCoupon(coupon: string): Promise<{ expiresIn: Date, percentage: number, code: string }>
}