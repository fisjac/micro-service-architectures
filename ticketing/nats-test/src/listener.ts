import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear()

import { TicketCreatedListener } from './events/ticket-created-listener';

const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});


client.on('connect', ()=> {
  console.log('listener connected to NATS')

  client.on('close', ()=> {
    console.log('connection closed');
    process.exit();
  });

  new TicketCreatedListener(client).listen()
});

process.on('SIGINT', ()=>client.close());
process.on('SIGTERM', ()=>client.close());
