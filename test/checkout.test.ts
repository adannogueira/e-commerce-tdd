import { CouponData } from '../src/domain/data/CouponData';
import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { OrderData } from '../src/domain/data/OrderData';
import { ProductData } from '../src/domain/data/ProductData';
import { Coupon } from '../src/domain/entities/Coupon';
import { Currencies } from '../src/domain/entities/Currencies';
import { Checkout } from '../src/application/Checkout';
import { Order } from '../src/domain/entities/Order';

class Product implements ProductData, CouponData, OrderData {
	getProduct(idProduct: number): Promise<any> {
		const products: any = {
			1: { idProduct: 1, description: 'Camera', price: 1000, width: 20, height: 15, length: 10, weight: 1, currency: 'BRL' },
			2: { idProduct: 2, description: 'Geladeira', price: 5000, width: 200, height: 10, length: 50, weight: 40, currency: 'BRL' },
			3: { idProduct: 3, description: 'Guitarra', price: 30, width: 100, height: 30, length: 10, weight: 3, currency: 'BRL' },
			4: null,
			5: { idProduct: 5, description: 'D', price: 30, width: -100, height: 30, length: 10, weight: 3, currency: 'BRL' },
			6: { idProduct: 6, description: 'E', price: 30, width: 100, height: 30, length: 10, weight: -3, currency: 'BRL' },
			7: { idProduct: 7, description: 'Guitar', price: 30, width: 100, height: 30, length: 10, weight: 3, currency: 'USD' },
		}
		return products[idProduct];
	}
	
	getCoupon(coupon: string): Promise<Coupon> {
		const coupons: any = {
			VALE20: { code: 'VALE20', percentage: 20, expiresIn: new Date('2024-01-01') },
			VALE10: { code: 'VALE10', percentage: 10, expiresIn: new Date('2022-01-01') }
		}
		return Promise.resolve(new Coupon(coupons[coupon]));
	}
	
	addOrder(order: any): Promise<any> {
		return Promise.resolve();
	}
	
	getLastOrder(): Promise<number> {
		return Promise.resolve(0);
	}
	
	
	getOrder({ cpf, code }: any): Promise<any> {
		throw new Error('Method not implemented.');
	}
	
	listOrders(params: { cpf?: string | undefined; }): Promise<Order[]> {
		throw new Error('Method not implemented.');
	}
}


const checkout = new Checkout(new Product(), new Product(), new Product(), new CurrencyGateway());
const currencies = new Currencies();
currencies.addCurrency('BRL', 1);
currencies.addCurrency('USD', 3);
jest
			.spyOn(CurrencyGateway.prototype, 'getCurrencies')
			.mockResolvedValue(currencies);

describe('Checkout()', () => {
	test("Não deve fazer um pedido com cpf inválido", async function () {
		const input: any = {
			cpf: "987.654.321-01"
		};
		const promise = checkout.execute(input);
		await expect(promise).rejects.toThrow("Invalid CPF");
	});
	
	test("Deve fazer um pedido com 3 produtos", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 2, quantity: 1 },
				{ idProduct: 3, quantity: 3 }
			]
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(6530);
	});
	
	test("Não deve fazer pedido com produto que não existe", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 4, quantity: 1 }
			]
		};
		const promise = checkout.execute(input);
		await expect(promise).rejects.toThrow("Product not found");
	});
	
	test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 2, quantity: 1 },
				{ idProduct: 3, quantity: 3 }
			],
			coupon: "VALE20"
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(5312);
	});
	
	test("Não deve aplicar um cupom de desconto expirado", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 2, quantity: 1 },
				{ idProduct: 3, quantity: 3 }
			],
			coupon: "VALE10"
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(6530);
	});
	
	test("Não deve fazer um pedido com uma quantidade negativa de produtos", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: -1 }
			]
		};
		const promise = checkout.execute(input);
		await expect(promise).rejects.toThrow("Invalid product quantity");
	});
	
	test("Não deve fazer um pedido quando um produto é informado mais de uma vez", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 1, quantity: 2 }
			]
		};
		const promise = checkout.execute(input);
		await expect(promise).rejects.toThrow("Invalid cart");
	});
	
	test("Não deve fazer um pedido quando alguma dimensão do produto é negativa", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 5, quantity: 1 }
			]
		};
		const promise = checkout.execute(input);
		await expect(promise).rejects.toThrow("Invalid product dimension");
	});
	
	test("Não deve fazer um pedido quando o weight do produto é negativo", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 6, quantity: 1 }
			]
		};
		const promise =  checkout.execute(input);
		await expect(promise).rejects.toThrow("Invalid product weight");
	});
	
	test("Não deve ter valor de frete menor que $10", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 }
			]
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(1010);
	});
	
	test("Deve calcular valor de frete com base nos produtos", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 2, quantity: 1 }
			]
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(5400);
	});

	test("Deve fazer um pedido com 4 produtos e com moedas diferentes", async function () {
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 2, quantity: 1 },
				{ idProduct: 3, quantity: 3 },
				{ idProduct: 7, quantity: 1 }
			]
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(6650);
	});

	test("Deve fazer um pedido e salvar os dados deste pedido", async function () {
		const databaseSpy = jest
			.spyOn(Product.prototype, 'addOrder')
			.mockResolvedValueOnce(null);
		const input = {
			cpf: "987.654.321-00",
			items: [
				{ idProduct: 1, quantity: 1 },
				{ idProduct: 2, quantity: 1 }
			]
		};
		const output = await checkout.execute(input);
		expect(output.total).toBe(6410);
		expect(databaseSpy).toHaveBeenCalled();
	});
});
