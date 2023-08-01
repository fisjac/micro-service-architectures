import nats from 'node-nats-streaming';

console.clear()

const client = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222'
});

client.on('connect', ()=> {
  console.log('Publisher connected to nats');
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });
  client.publish('ticket:created', data, ()=> {
    console.log('event published')
  })
});
