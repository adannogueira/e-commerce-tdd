import express from "express";
import { validate } from "./CpfValidator";
import { dbAll } from './database';
const app = express();
app.use(express.json());


// const products = [
// 	{ idProduct: 1, description: "A", price: 1000 },
// 	{ idProduct: 2, description: "B", price: 5000 },
// 	{ idProduct: 3, description: "C", price: 30 }
// ];

// const coupons = [
// 	{ code: "VALE20", percentage: 20 }
// ];

app.post("/checkout", async function (req, res) {
	const isValid = validate(req.body.cpf);
	if (!isValid) {
		return res.status(422).json({
			message: "Invalid cpf"
		});
	}
	let total = 0;
	let freight = 0;
	for (const item of req.body.items) {
		if (req.body.items.filter(({ idProduct }: { idProduct: number }) => idProduct === item.idProduct).length > 1) {
			return res.status(422).json({
				message: "Invalid cart"
			});
		}
		if (item.quantity <= 0) {
			return res.status(422).json({
				message: "Invalid product quantity"
			});
		}
		// const product = products.find((product) => product.idProduct === item.idProduct);
		const result = await dbAll(`select * from product where id_product = ${item.idProduct}`);
		if (result.length) {
			const product = result[0];
			if (product.largura < 0 || product.altura < 0 || product.profundidade < 0) {
				return res.status(422).json({
					message: "Invalid product dimension"
				});
			}
			if (product.peso < 0) {
				return res.status(422).json({
					message: "Invalid product weight"
				});
			}
			total += parseFloat(product.price) * item.quantity;
			const volume = (parseInt(product.largura) * parseInt(product.altura) * parseInt(product.profundidade)) * 0.000001;
			const densidade = parseInt(product.peso) / volume;
			const frete = 1000 * volume * (densidade / 100);
			freight += frete > 10 ? frete : 10;
		} else {
			return res.status(422).json({
				message: "Product not found"
			});
		}
	}
	if (req.body.coupon) {
		// const coupon = coupons.find(coupon => coupon.code === req.body.coupon);
		const result = await dbAll(`select * from coupon where code = '${req.body.coupon}'`);
		if (result.length && new Date(result[0].expiresIn) >= new Date()) {
			total -= (total * result[0].percentage)/100;
		}
	}
	res.json({
		total,
		freight
	});
});

app.listen(3000);
