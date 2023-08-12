import { CurrencyGateway } from '../infra/gateway/CurrencyGateway';
import { OrderData } from '../domain/data/OrderData';
import { Order } from '../domain/entities/Order';
import { CouponData } from '../domain/data/CouponData';
import { FreightGateway } from '../infra/gateway/FreightGateway';
import { CatalogGateway } from '../infra/gateway/CatalogGateway';

const warehouseLocation = '47820000'
export class Checkout {
	constructor(
		private readonly catalogGateway: CatalogGateway,
		private readonly couponData: CouponData,
		private readonly orderData: OrderData,
		private readonly currencyGateway: CurrencyGateway,
		private readonly freightGateway: FreightGateway
	) {}

	public async execute (input: Input) {
		const currencies = await this.currencyGateway.getCurrencies();
		const sequence = await this.orderData.getLastOrder() + 1;
		const order = new Order(input.cpf, sequence);
		const items = [];
		for (const item of input.items) {
			const product = await this.catalogGateway.getProduct(item.idProduct);
			if (!product) throw new Error("Product not found");
			items.push({
				volume: product.calculateVolume(),
				density: product.calculateDensity(),
				quantity: item.quantity
			});
			order.addItem(
				product,
				item.quantity,
				product.currency,
				currencies.getCurrency(product.currency)
				);
			}
			const freight = await this.freightGateway.calculateFreight({
				from: warehouseLocation,
				to: input.cep,
				items
			})
		order.addFreight(freight)
		if (input.coupon) {
			const coupon = await this.couponData.getCoupon(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		await this.orderData.addOrder(order);
		return { code: order.getCode(), total: order.getTotal() };
	}
}

type Input = {
  cpf: string,
	cep: string,
  items: { idProduct: number, quantity: number }[],
  coupon?: string
}
