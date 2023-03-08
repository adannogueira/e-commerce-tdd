import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { Database } from '../src/infra/data/Database';
import { Checkout } from '../src/application/Checkout';
import { GetOrder } from '../src/application/GetOrder';
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';

describe('GetOrder', () => {
  it('should return an order', async () => {
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(
      database,
      database,
      database,
      new CurrencyGateway()
    );
    const input = {
      cpf: '987.654.321-00',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
      ]
    };
    await checkout.execute(input);
    const getOrder = new GetOrder(database);
    const output = await getOrder.execute({ cpf: input.cpf });
    expect(output.getCpf()).toBe(input.cpf);
  });
});
