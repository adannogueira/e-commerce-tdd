import amqp from 'amqplib';
import { Queue } from './Queue';

export class QueueRabbit implements Queue {
  private connection!: amqp.Connection;

  public async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
  }

  public async on(queueName: string, callback: Function): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (msg: any) => {
      const input = JSON.parse(msg.content.toString());
      await callback(input);
      channel.ack(msg);
    })
  }

  public async publish(queueName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }
}
