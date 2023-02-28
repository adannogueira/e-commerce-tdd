import express from "express";
import { Checkout } from './use-cases/Checkout';
import { MyDatabase } from './Database';
import { CouponValidator } from './use-cases/CouponValidator';
import { FreightCalculator } from './use-cases/FreightCalculator';

const app = express();
app.use(express.json());

app.post("/checkout", async function (req, res) {
	const database = new MyDatabase();
	const couponValidator = new CouponValidator(database);
	const checkout = new Checkout(database, couponValidator, database, new FreightCalculator(database));
	try {
		const output = await checkout.execute(req.body);
		res.json(output);
	} catch (error: any) {
		res.status(422).json({ message: error.message })
	}
});

app.listen(3000);
