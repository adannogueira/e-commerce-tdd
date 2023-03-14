import { CurrencyGateway } from '../src/infra/gateway/CurrencyGateway';
import { Database } from '../src/infra/data/Database';
import { Checkout } from '../src/application/Checkout';
import { GetOrderByCode } from '../src/application/GetOrderByCode';
import { SqLiteConnection } from '../src/infra/database/SqLiteConnection';

jest.useFakeTimers().setSystemTime(new Date('2023/01/01'));

describe('GetOrderByCode', () => {
  it('should return an order by orderCode', async () => {
    const code = '202300000001'
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(
      database,
      database,
      database,
      new CurrencyGateway(),
      database
    );
    const input = {
      cpf: '987.654.321-00',
      cep: '29560-000',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
      ]
    };
    await checkout.execute(input);
    const getOrder = new GetOrderByCode(database);
    const output = await getOrder.execute(code);
    expect(output.getCpf()).toBe(input.cpf);
  });
});
