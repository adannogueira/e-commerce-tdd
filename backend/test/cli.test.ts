import { Checkout } from '../checkout/src/application/Checkout';
import { FreightCalculator } from '../checkout/src/domain/entities/FreightCalculator';
import { CliAdapterMemory } from '../checkout/src/infra/cli/adapters/CliAdapterMemory';
import { CliController } from '../checkout/src/infra/cli/CliController';
import { CliHandler } from '../checkout/src/infra/cli/CliHandler';
import { Database } from '../checkout/src/infra/data/Database';
import { SqLiteConnection } from '../checkout/src/infra/database/SqLiteConnection';
import { CurrencyGateway } from '../checkout/src/infra/gateway/CurrencyGateway';

describe('Cli', () => {
  it('should test the Cli', async () => {
    // Arrange
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(database, database, database, new CurrencyGateway(), database, FreightCalculator);
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
