import { Checkout } from '../src/application/Checkout';
import { Database } from '../src/infra/data/Database';
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';
import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { QueueController } from '../src/infra/queue/QueueController';
import { QueueMemory } from '../src/infra/queue/QueueMemory';
import { FreightGatewayHttp } from '../src/infra/gateway/FreightGatewayHttp';
import { CatalogGatewayHttp } from '../src/infra/gateway/CatalogGatewayHttp';

describe('Queue', () => {
  it('should test the Queue', async () => {
    // Arrange
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(new CatalogGatewayHttp(), database, database, new CurrencyGateway(), new FreightGatewayHttp());
    const checkoutSpy = jest.spyOn(checkout, 'execute');
    const queue = new QueueMemory();
    new QueueController(queue, checkout);

    // Act
    await queue.publish('checkout', {
      cpf: '987.654.321-00',
      cep: '29560000',
      items: [{ idProduct: 1, quantity: 1 }]
    });

    // Assert
    expect(checkoutSpy).toHaveBeenCalledWith({
      cpf: '987.654.321-00',
      cep: '29560000',
      items: [{ idProduct: 1, quantity: 1 }]
    });
  });
});
