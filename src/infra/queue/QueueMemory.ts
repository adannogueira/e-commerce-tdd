import { Queue } from './Queue';

export class QueueMemory implements Queue {
  observers: { queueName: string, callback: Function }[] = [];

  public async connect(): Promise<void> {}

  public async on(queueName: string, callback: Function): Promise<void> {
    this.observers.push({ queueName, callback });
  }

  public async publish(queueName: string, data: any): Promise<void> {
    const observer = this.observers.find(observer => observer.queueName === queueName);
    await observer?.callback(data);
  }
}