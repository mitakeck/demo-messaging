// send.js
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@localhost:5672', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'message';
    const message = (new Date()).toISOString();

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q,  Buffer.from(message));

    setTimeout(() => {
      conn.close();
      process.exit(0);
  }, 500);
  });
});
