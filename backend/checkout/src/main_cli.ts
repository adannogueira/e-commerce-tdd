import { Checkout } from './application/Checkout';
import { CliAdapterNode } from './infra/cli/adapters/CliAdapterNode';
import { CliController } from './infra/cli/CliController';
import { CliHandler } from './infra/cli/CliHandler';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';

const database = new Database(new SqLiteConnection());
const checkout = new Checkout(database, database, database, new CurrencyGateway(), database);
const cliHandler = new CliHandler();
const cliAdapter = new CliAdapterNode(cliHandler);
new CliController(cliAdapter, checkout);