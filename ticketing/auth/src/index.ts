import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose, { connect } from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { vanessaRouter } from './routes/vanessa';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

// routes
app.use(currentUserRouter);
app.use(vanessaRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async ()=> {
  throw new NotFoundError();
});


// additional middlewares
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb')
  } catch (err) {
    console.error(err)
  }
}

app.listen(3000, ()=>{
  console.log('Listening on 3000')
})

start();
