import { Checkout } from './application/Checkout';
import { RestController } from './infra/controller/RestController';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';
import { ExpressHttpServer } from './infra/http/ExpressHttpServer';

const database = new Database(new SqLiteConnection());
const checkout = new Checkout(database, database, database, new CurrencyGateway(), database);
const httpServer = new ExpressHttpServer();
new RestController(httpServer, checkout)
httpServer.listen(3000);