import { Mailer } from './Mailer';

export class MailerConsole implements Mailer {
  async send(to: string, subject: string, message: string): Promise<void> {
    Promise.resolve(console.log(to, subject, message));
  }
}