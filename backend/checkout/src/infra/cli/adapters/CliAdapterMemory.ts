import { CliHandler } from '../CliHandler';
import { CliAdapter } from './CliAdapter';

export class CliAdapterMemory implements CliAdapter {
  constructor(public readonly handler: CliHandler) { }

  write(text: string): void { }
}