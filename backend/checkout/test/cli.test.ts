import { Checkout } from '../src/application/Checkout';
import { CliAdapterMemory } from '../src/infra/cli/adapters/CliAdapterMemory';
import { CliController } from '../src/infra/cli/CliController';
import { CliHandler } from '../src/infra/cli/CliHandler';
import { Database } from '../src/infra/data/Database';
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';
import { CatalogGatewayHttp } from '../src/infra/gateway/CatalogGatewayHttp';
import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { FreightGatewayHttp } from '../src/infra/gateway/FreightGatewayHttp';

describe('Cli', () => {
  it('should test the Cli', async () => {
    // Arrange
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(new CatalogGatewayHttp(), database, database, new CurrencyGateway(), new FreightGatewayHttp());
    const checkoutSpy = jest.spyOn(checkout, 'execute');
    const cliHandler = new CliHandler()
    const cliAdapter = new CliAdapterMemory(cliHandler);
    new CliController(cliAdapter, checkout);

    // Act
    await cliHandler.type('set-cpf 987.654.321-00');
    await cliHandler.type('add-item 1 1');
    await cliHandler.type('add-cep 29560000');
    await cliHandler.type('checkout');

    // Assert
    expect(checkoutSpy).toHaveBeenCalledWith({
      cpf: '987.654.321-00',
      cep: '29560000',
      items: [{
        idProduct: 1,
        quantity: 1
        }]
    });
  });
});
