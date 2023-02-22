import express from "express";
import { Checkout } from './Checkout';
import { MyDatabase } from './Database';

const app = express();
app.use(express.json());

app.post("/checkout", async function (req, res) {
	const database = new MyDatabase();
	const checkout = new Checkout(database, database, database);
	try {
		const output = await checkout.execute(req.body);
		res.json(output);
	} catch (error: any) {
		res.status(422).json({ message: error.message })
	}
});

app.listen(3000);
