import { Checkout } from '../../application/Checkout';
import { Queue } from './Queue';

export class QueueController {
  public constructor(
    private readonly queue: Queue,
    private readonly checkout: Checkout
  ) {
    queue.on('checkout', async (input: any) => {
      await checkout.execute(input);
    });
  }
}
