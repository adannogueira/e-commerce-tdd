import { Checkout } from '../../application/Checkout';
import { CliHandler } from './CliHandler';

export class CliController {

  public constructor(
    private readonly handler: CliHandler,
    private readonly checkout: Checkout
  ) {
    const input: any = {
      items: []
    };

    handler.on('set-cpf', (params: string) => {
      input.cpf = params;
    });

    handler.on('add-item', (params: string) => {
      const [idProduct, quantity] = params.split(' ');
      input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
    });

    handler.on('add-cep', (params: string) => {
      input.cep = params;
    });

    handler.on('checkout', async () => {
      const output = await checkout.execute(input);
    });
  }
}