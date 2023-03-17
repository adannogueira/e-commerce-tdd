export class CliHandler {
  private commands: { [command: string]: Function } = {};

  public on(command: string, callback: Function): void {
    this.commands[command] = callback;
  }

  public async type(text: string): Promise<void> {
    const [command] = text.split(' ');
    if (!this.commands[command]) return;
    const params = text.replace(command, '').trim();
    await this.commands[command](params);
  }
}