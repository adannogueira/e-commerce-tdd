import amqp from 'amqplib';
import { Checkout } from './Checkout';
import { MyDatabase } from './Database';

async function init () {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('checkout', { durable: true });
  await channel.consume('checkout', async function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    const database = new MyDatabase();
	const   checkout = new Checkout(database, database);
    try {
      const output = await checkout.execute(input);
      console.log(output);
    } catch (error: any) {
      console.log(error.message);
    }
    channel.ack(msg);
  });
}

init();
