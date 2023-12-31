import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';



declare global {
  var getCookie: () => string[];
};

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll( async () => {
  process.env.JWT_KEY = 'some key';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach( async ()=> {
  jest.clearAllMocks();
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
    id: new mongoose.Types.ObjectId().toHexString(),
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
