import request from 'supertest';

import { app } from "../../app";

it('fails when the user does not exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns 200 on successful credentials', async () => {
  await request(app)
    .post(('/api/users/signup'))
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns 400 on invalid credentials', async () => {
  await request(app)
    .post(('/api/users/signup'))
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'wrong@test.com',
    password: 'password'
  })
  .expect(400);
});
