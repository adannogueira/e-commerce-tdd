import { MyDatabase } from '../src/Database';
import { Checkout } from '../src/use-cases/Checkout';
import { CouponValidator } from '../src/use-cases/CouponValidator';
import { FreightCalculator } from '../src/use-cases/FreightCalculator';
import { GetOrder } from '../src/use-cases/GetOrder';

describe('GetOrder', () => {
  it('should return an order', async () => {
    const database = new MyDatabase();
    const checkout = new Checkout(
      database,
      new CouponValidator(database),
      database,
      new FreightCalculator(database)
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
    expect(output.total).toBe(6090);
  });
});
