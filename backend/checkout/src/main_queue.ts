import { Checkout } from './application/Checkout';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CatalogGatewayHttp } from './infra/gateway/CatalogGatewayHttp';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';
import { FreightGatewayHttp } from './infra/gateway/FreightGatewayHttp';
import { QueueController } from './infra/queue/QueueController';
import { QueueRabbit } from './infra/queue/QueueRabbit';

async function init () {
  const database = new Database(new SqLiteConnection());
  const checkout = new Checkout(new CatalogGatewayHttp(), database, database, new CurrencyGateway(), new FreightGatewayHttp());
  const queue = new QueueRabbit();
  await queue.connect();
  new QueueController(queue, checkout);
}

init();