import request from "supertest";
import { app } from "../../app";

it('responds with details about current user', async () => {

  const cookie = await getCookie();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser).toBeDefined();


})
