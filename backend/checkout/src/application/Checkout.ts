import { CurrencyGateway } from '../infra/gateway/CurrencyGateway';
import { OrderData } from '../domain/data/OrderData';
import { ProductData } from '../domain/data/ProductData';
import { Order } from '../domain/entities/Order';
import { CouponData } from '../domain/data/CouponData';
import { DistanceCalculator } from '../domain/entities/DistanceCalculator';
import { Coordinates } from '../domain/entities/Coordinates';
import { CoordinateData } from '../domain/data/CoordinateData';
import { FreightCalculator } from '../domain/entities/FreightCalculator';

const warehouseLocation = Coordinates.create({ latitude: -12.61090938578852, longitude: -45.18807094350862 });
export class Checkout {
	constructor(
		private readonly productData: ProductData,
		private readonly couponData: CouponData,
		private readonly orderData: OrderData,
		private readonly currencyGateway: CurrencyGateway,
		private readonly coordinateData: CoordinateData,
		private readonly freightCalculator: typeof FreightCalculator
	) {}

	public async execute (input: Input) {
		const currencies = await this.currencyGateway.getCurrencies();
		const sequence = await this.orderData.getLastOrder() + 1;
		const order = new Order(input.cpf, sequence);
		for (const item of input.items) {
			const product = await this.productData.getProduct(item.idProduct);
			if (!product) throw new Error("Product not found");
			const clientLocation = await this.coordinateData.getCoordinate(input.cep);
			const distance =  DistanceCalculator.calculate(warehouseLocation, clientLocation);
			order.addFreight(this.freightCalculator.calculate(product, distance, item.quantity))
			order.addItem(
				product,
				item.quantity,
				product.currency,
				currencies.getCurrency(product.currency)
			);
		}
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
