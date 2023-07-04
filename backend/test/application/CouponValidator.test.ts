import { Coupon } from '../../checkout/src/domain/entities/Coupon';
import { CouponValidator } from '../../src/application/CouponValidator';

class CouponData {
  getCoupon(coupon: string): Promise<Coupon> {
		const coupons: any = {
			VALE20: { code: 'VALE20', percentage: 20, expiresIn: new Date('2024-01-01') },
			VALE10: { code: 'VALE10', percentage: 10, expiresIn: new Date('2022-01-01') }
		}
		return Promise.resolve(new Coupon(coupons[coupon]));
	}
}

const couponValidator = new CouponValidator(new CouponData());

describe('CouponValidator', () => {
  test.each([
    ['VALE20', true],
    ['VALE10', false]
  ])("Deve validar um cupom de desconto", async function (coupon, expected) {
		const validation = await couponValidator.validate(1000, coupon);
		expect(validation.isValid).toBe(expected);
	});

  test("Deve retornar os dados do cupom válido", async function () {
		const coupon = "VALE20";
		const total = 1000;
		const validation = await couponValidator.validate(total, coupon);
		expect(validation).toEqual({ isValid: true, discount: 200 });
	});

  test("Deve retornar desconto 0 do cupom inválido", async function () {
		const coupon = "VALE10";
		const total = 1000;
		const validation = await couponValidator.validate(total, coupon);
		expect(validation).toEqual({ isValid: false, discount: 0 });
	});
});
