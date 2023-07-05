import { CliHandler } from '../CliHandler';

export interface CliAdapter {
  handler: CliHandler;
  write(text: string): void;
}