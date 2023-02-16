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
	for (const item of req.body.items) {
		// const product = products.find((product) => product.idProduct === item.idProduct);
		const result = await dbAll(`select * from product where id_product = ${item.idProduct}`);
		if (result.length) {
			total += parseFloat(result[0].price) * item.quantity;
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
		total
	});
});

app.listen(3000);
