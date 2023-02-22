import { CouponData } from './CouponData';
import { validate } from './CpfValidator';
import { CurrencyGateway } from './CurrencyGateway';
import { OrderData } from './OrderData';
import { ProductData } from './ProductData';

export class Checkout {
	constructor(
		private readonly productData: ProductData,
		private readonly couponData: CouponData,
		private readonly orderData: OrderData
	) {}

	public async execute (input: Input) {
		const isValid = validate(input.cpf);
		if (!isValid) {
			throw new Error("Invalid cpf");
		}
		let total = 0;
		let freight = 0;
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
			if (product) {
				if (product.largura < 0 || product.altura < 0 || product.profundidade < 0) {
					throw new Error("Invalid product dimension");
				}
				if (product.peso < 0) {
					throw new Error("Invalid product weight");
				}
				total += (parseFloat(product.price) * item.quantity) * currencies[product.currency];
				const volume = (parseInt(product.largura) * parseInt(product.altura) * parseInt(product.profundidade)) * 0.000001;
				const densidade = parseInt(product.peso) / volume;
				const frete = 1000 * volume * (densidade / 100);
				freight += frete > 10 ? frete : 10;
			} else {
				throw new Error("Product not found");
			}
		}
		if (input.coupon) {
			const coupon = await this.couponData.getCoupon(input.coupon);
			if (coupon && new Date(coupon.expiresIn) >= new Date()) {
				total -= (total * coupon.percentage)/100;
			}
		}
		await this.orderData.addOrder(JSON.stringify(input.items.map(item => item.idProduct)))
		return { total,	freight: Math.round(freight) };
	}
}

type Input = {
  cpf: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string
}
