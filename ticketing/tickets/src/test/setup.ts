import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import request from 'supertest'

declare global {
  var getCookie: () => string[];
};

let mongo: any;
beforeAll( async () => {
  process.env.JWT_KEY = 'some key';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach( async ()=> {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  };
});

afterAll( async () => {
  if (mongo) {
    await mongo.stop();
  };
  await mongoose.connection.close();
});

global.getCookie = () => {
  // build JWT payload. {id, email}
  const payload = {
    id: '123',
    email: 'test@test.com'
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object
  const session = { jwt: token }
  // turn session into JSON
  const sessionJSON = JSON.stringify(session);
  // encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return string that's the cookie with encoded data
  return [`session=${base64}`]
};
