import { Checkout } from './application/Checkout';
import { GetOrderByCode } from './application/GetOrderByCode';
import { ListOrdersByCpf } from './application/ListOrdersByCpf';
import { CheckoutController } from './infra/controller/CheckoutController';
import { GetOrderController } from './infra/controller/GetOrderController';
import { ListOrdersController } from './infra/controller/ListOrdersController';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CatalogGatewayHttp } from './infra/gateway/CatalogGatewayHttp';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';
import { FreightGatewayHttp } from './infra/gateway/FreightGatewayHttp';
import { ExpressHttpServer } from './infra/http/ExpressHttpServer';

const database = new Database(new SqLiteConnection());
const checkout = new Checkout(new CatalogGatewayHttp(), database, database, new CurrencyGateway(), new FreightGatewayHttp());
const getOrder = new GetOrderByCode(database);
const listOrders = new ListOrdersByCpf(database);
const httpServer = new ExpressHttpServer();
new CheckoutController(httpServer, checkout);
new GetOrderController(httpServer, getOrder);
new ListOrdersController(httpServer, listOrders)
httpServer.listen(3000);