import request from 'supertest';
import {app} from '../../app';

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
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({
      title: 'Some title',
      price: 10
    })
    .expect(201);
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
