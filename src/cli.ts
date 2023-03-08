import { Checkout } from './application/Checkout';
import { Database } from './infra/data/Database';
import { SqLiteConnection } from './infra/database/SqLiteConnection';
import { CurrencyGateway } from './infra/gateway/CurrencyGateway';

const input: any = {
  items: []
};

process.stdin.on('data', async function (chunk) {
  const command = chunk.toString().replace(/\n/g, '');
  if (command.startsWith('set-cpf')) {
    const params = command.replace('set-cpf ', '');
    input.cpf = params;
  }
  if (command.startsWith('add-item')) {
    const params = command.replace('add-item ', '');
    const [idProduct, quantity] = params.split(' ');
    input.items.push({ idProduct, quantity });
  }
  if (command.startsWith('checkout')) {
    const database = new Database(new SqLiteConnection());
	  const checkout = new Checkout(database, database, database, new CurrencyGateway());
    try {
      const output = await checkout.execute(input);
      console.log(output)
    } catch (error: any) {
      console.log(error.message);
    }
  }
});
