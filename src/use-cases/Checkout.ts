import { validate } from './CpfValidator';
import { CurrencyGateway } from '../CurrencyGateway';
import { OrderData } from '../OrderData';
import { ProductData } from '../ProductData';
import { CouponValidator } from './CouponValidator';
import { FreightCalculator } from './FreightCalculator';

export class Checkout {
	constructor(
		private readonly productData: ProductData,
		private readonly couponvalidator: CouponValidator,
		private readonly orderData: OrderData,
		private readonly freightCalculator: FreightCalculator
	) {}

	public async execute (input: Input) {
		const isValid = validate(input.cpf);
		if (!isValid) {
			throw new Error("Invalid cpf");
		}
		let total = 0;
		const currencyGateway = new CurrencyGateway();
		const currencies: any = await currencyGateway.getCurrencies();
		for (const item of input.items) {
			if (input.items.filter(({ idProduct }: { idProduct: number }) => idProduct === item.idProduct).length > 1) {
				throw new Error("Invalid cart");
			}
			if (item.quantity <= 0) {
				throw new Error("Invalid product quantity");
			}
			const product = await this.productData.getProduct(item.idProduct);
			if (!product) throw new Error("Product not found");
			total += (product.price * item.quantity) * currencies[product.currency];
		}
		const freight = await this.freightCalculator.execute(input.items);
		const coupon = await this.couponvalidator.validate(input.coupon);
		total -= (total * coupon.percentage)/100;
		const lastId = await this.orderData.getLastOrder();
		const orderCode = `${new Date().getFullYear()}${(lastId + 1).toString().padStart(8, '0')}`
		await this.orderData.addOrder({
			code: orderCode,
			couponCode: input.coupon,
			couponPercentage: coupon.percentage,
			cpf: input.cpf,
			freight,
			total
		})
		return { total,	freight: Math.round(freight), validCoupon: coupon.isValid };
	}
}

type Input = {
  cpf: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string
}
