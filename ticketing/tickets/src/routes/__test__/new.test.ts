import request from 'supertest';
import {app} from '../../app';
import { Ticket } from '../../models/tickets';

it('Listening to post /api/tickets', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({
      title: 'Some Event'
    });
    expect(response.status).not.toEqual(404);
});

it('Post returns 401 for authenticated users', async () => {
  await request(app).post('/api/tickets').send({})
    .expect(401);
});

it('Post is successful for authenticated users', async () => {
  // TODO add check for ticket being added to MongoDB
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({});
  expect(response.statusCode).not.toEqual(401);
  }
);

it('throws an error for invalid titles', async ()=> {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: 'Some Title',
      price: -10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: 'Some Title',
      price: ''
    })
    .expect(400);
});

it('Creates a ticket on successful request', async  () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'New Title'

  const response = await request(app).post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title,
      price: 20
    })
    .expect(201)

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});
