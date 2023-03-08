import amqp from 'amqplib';
import { Checkout } from './application/Checkout';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';

async function init () {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('checkout', { durable: true });
  await channel.consume('checkout', async function (msg: any) {
    const input = JSON.parse(msg.content.toString());
    const database = new Database(new SqLiteConnection());
	const   checkout = new Checkout(database, database, database, new CurrencyGateway());
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
