import { CliHandler } from '../CliHandler';
import { CliAdapter } from './CliAdapter';

export class CliAdapterNode implements CliAdapter {
  constructor(public readonly handler: CliHandler) {
    process.stdin.on('data', (chunk) => {
      const text = chunk.toString().replace(/(\r\n|\r|\n)/g, '');
      handler.type(text);
    })
  }
  
  write(text: string): void {
    console.log(text);
  }
}