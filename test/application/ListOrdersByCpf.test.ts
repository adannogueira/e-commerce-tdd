import { CurrencyGateway } from '../../src/infra/gateway/CurrencyGateway';
import { Database } from '../../src/infra/data/Database';
import { Checkout } from '../../src/application/Checkout';
import { SqLiteConnection } from '../../src/infra/database/SqLiteConnection';
import { ListOrdersByCpf } from '../../src/application/ListOrdersByCpf';

jest.useFakeTimers().setSystemTime(new Date('2023/01/01'));

describe('ListOrdersByCpf', () => {
  it('should list orders from given cpf', async () => {
    const database = new Database(new SqLiteConnection());
    const checkout = new Checkout(
      database,
      database,
      database,
      new CurrencyGateway(),
      database
    );
    const cpf = '987.654.321-00';
    const input1 = {
      cpf,
      cep: '29560000',
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 }
      ]
    };
    const input2 = {
      cpf,
      cep: '29560-000',
      items: [{ idProduct: 2, quantity: 2 }]
    };
    await checkout.execute(input1);
    await checkout.execute(input2);
    const listOrders = new ListOrdersByCpf(database);
    const output = await listOrders.execute(cpf);
    expect(output.map(item => item.cpf)).toEqual([cpf, cpf]);
  });
});
