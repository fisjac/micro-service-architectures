import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';

it('Should be listening to put /api/tickets/:id', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .send({});

  expect(response.statusCode).not.toEqual(404);
});

it('Should return 401 for unauthorized users', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'new',
      price: 20
    })
    .expect(401);
});

it('Should return 404 for ticket that does not exist', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie',getCookie())
    .send({
      title: 'new',
      price: 20
    })
    .expect(404);
});

it('Should return 401 for tickets the user does not own', async()=>{
  const postResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({title:'new', price:20})
    .expect(201);

  await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', getCookie())
    .send({title:'new', price:20})
    .expect(401);
});

it('Should return 400 for invalid title or price', async()=>{
  const cookie = getCookie()
  const postResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({title:'old', price:10})
    .expect(201);

  await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', cookie)
    .send({title:'', price:20})
    .expect(400);

  await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', cookie)
    .send({title:'new', price:-1})
    .expect(400);
});

it('Ticket gets updated for valid request', async()=>{
  const cookie = getCookie()
  const postResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({title:'old', price:10})
    .expect(201);

  const response = await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', cookie)
    .send({title:'new', price:20})
    .expect(200);

  expect(response.body.title).toEqual('new');
  expect(response.body.price).toEqual(20);
});
