import { Checkout } from './application/Checkout';
import { CliAdapterNode } from './infra/cli/adapters/CliAdapterNode';
import { CliController } from './infra/cli/CliController';
import { CliHandler } from './infra/cli/CliHandler';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CatalogGatewayHttp } from './infra/gateway/CatalogGatewayHttp';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';
import { FreightGatewayHttp } from './infra/gateway/FreightGatewayHttp';

const database = new Database(new SqLiteConnection());
const checkout = new Checkout(new CatalogGatewayHttp(), database, database, new CurrencyGateway(), new FreightGatewayHttp());
const cliHandler = new CliHandler();
const cliAdapter = new CliAdapterNode(cliHandler);
new CliController(cliAdapter, checkout);