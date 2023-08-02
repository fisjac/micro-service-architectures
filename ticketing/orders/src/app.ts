import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@jf-ticketing/common';

import { indexOrderRouter } from './routes';
import { createOrderRouter } from './routes/create';
import { updateOrderRouter } from './routes/update';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);
app.use(currentUser);

// routes
app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(updateOrderRouter);
app.use(deleteOrderRouter);


app.all('*', async ()=> {
  throw new NotFoundError();
});


// additional middlewares
app.use(errorHandler);

export { app };
