const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@localhost:5672', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'message';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    
    ch.consume(q, msg => {
        console.log(`Received ${msg.content.toString()}`);

        setTimeout(() => {
          console.log(' [x] Done');
          // 完了応答
          ch.ack(msg);
        }, 2000);

    }, { noAck: false });
  });
});
