import request from 'supertest';
import {app} from '../../app';

const createTicket = (title:string,price:number) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', getCookie())
    .send({title,price})
};

it('should fetch a list of tickets', async ()=> {
  await createTicket('new1', 10);
  await createTicket('new2', 15);
  await createTicket('new3', 20);

    const response = await request(app)
      .get('/api/tickets')
      .send()
      .expect(200)
    expect(response.body.length).toEqual(3);
});
