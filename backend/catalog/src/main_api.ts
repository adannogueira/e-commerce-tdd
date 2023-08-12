import { GetProduct } from './application/GetProduct';
import { ListProducts } from './application/ListProducts';
import { GetProductController } from './infra/controller/GetProductController';
import { ListProductsController } from './infra/controller/ListProductsController';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { ExpressHttpServer } from './infra/http/ExpressHttpServer';

const database = new Database(new SqLiteConnection());
const listProducts = new ListProducts(database);
const getProduct = new GetProduct(database)
const httpServer = new ExpressHttpServer();
new ListProductsController(httpServer, listProducts);
new GetProductController(httpServer, getProduct);
httpServer.listen(3002);