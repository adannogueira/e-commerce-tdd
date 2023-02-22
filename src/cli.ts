import { Checkout } from './Checkout';
import { MyDatabase } from './Database';

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
    const database = new MyDatabase();
	  const checkout = new Checkout(database, database);
    try {
      const output = await checkout.execute(input);
      console.log(output)
    } catch (error: any) {
      console.log(error.message);
    }
  }
});
