import amqp from 'amqplib';

async function init () {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('checkout', { durable: true });
  const input = {
    cpf: '00000000191',
    cep: '29560000',
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 4 }
    ]
  };
  channel.sendToQueue('checkout', Buffer.from(JSON.stringify(input)));
}

init();
