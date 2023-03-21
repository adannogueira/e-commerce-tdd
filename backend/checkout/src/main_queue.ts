import { Checkout } from './application/Checkout';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';
import { QueueController } from './infra/queue/QueueController';
import { QueueRabbit } from './infra/queue/QueueRabbit';

async function init () {
  const database = new Database(new SqLiteConnection());
  const checkout = new Checkout(database, database, database, new CurrencyGateway(), database);
  const queue = new QueueRabbit();
  await queue.connect();
  new QueueController(queue, checkout);
}

init();