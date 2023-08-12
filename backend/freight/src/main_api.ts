import { CalculateFreight } from './application/CalculateFreight';
import { FreightController } from './infra/controller/FreightController';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { ExpressHttpServer } from './infra/http/ExpressHttpServer';

const database = new Database(new SqLiteConnection());
const calculateFreight = new CalculateFreight(database)
const httpServer = new ExpressHttpServer();
new FreightController(httpServer, calculateFreight);

httpServer.listen(3001);