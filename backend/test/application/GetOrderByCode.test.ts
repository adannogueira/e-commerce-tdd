import { CurrencyGateway } from '../../checkout/src/infra/gateway/CurrencyGateway';
import { Database } from '../../checkout/src/infra/data/Database';
import { Checkout } from '../../checkout/src/application/Checkout';
import { GetOrderByCode } from '../../checkout/src/application/GetOrderByCode';
import { SqLiteConnection } from '../../checkout/src/infra/database/SqLiteConnection';
import { FreightCalculator } from '../../checkout/src/domain/entities/FreightCalculator';

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
      database,
      FreightCalculator
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
    expect(output.cpf).toBe(input.cpf);
  });
});
