import { CouponValidator } from '../src/use-cases/CouponValidator';

class CouponData {
  getCoupon(coupon: string): Promise<any> {
		const coupons: any = {
			VALE20: { code: 'VALE20', percentage: 20, expiresIn: '2024-01-01' },
			VALE10: { code: 'VALE10', percentage: 10, expiresIn: '2022-01-01' }
		}
		return coupons[coupon];
	}
}

const couponValidator = new CouponValidator(new CouponData());

describe('CouponValidator', () => {
  test.each([
    ['VALE20', true],
    ['VALE10', false]
  ])("Deve validar um cupom de desconto", async function (coupon, expected) {
		const validation = await couponValidator.validate(coupon);
		expect(validation.isValid).toBe(expected);
	});

  test("Deve retornar os dados do cupom válido", async function () {
		const coupon = "VALE20";
		const validation = await couponValidator.validate(coupon);
		expect(validation).toEqual({ isValid: true, percentage: 20 });
	});
});
