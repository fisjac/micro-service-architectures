import nats from 'node-nats-streaming';

const client = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222'
});

client.on('connect', ()=> {
  console.log('Publisher connected to nats')
});
