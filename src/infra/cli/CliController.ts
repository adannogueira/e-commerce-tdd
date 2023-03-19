import { Checkout } from '../../application/Checkout';
import { CliAdapter } from './adapters/CliAdapter';
import { CliHandler } from './CliHandler';

export class CliController {

  public constructor(
    private readonly cliAdapter: CliAdapter,
    checkout: Checkout
  ) {
    const input: any = {
      items: []
    };

    this.cliAdapter.handler.on('set-cpf', (params: string) => {
      input.cpf = params;
    });

    this.cliAdapter.handler.on('add-item', (params: string) => {
      const [idProduct, quantity] = params.split(' ');
      input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
    });

    this.cliAdapter.handler.on('add-cep', (params: string) => {
      input.cep = params;
    });

    this.cliAdapter.handler.on('checkout', async () => {
      const output = await checkout.execute(input);
      this.cliAdapter.write(JSON.stringify(output));
    });
  }
}