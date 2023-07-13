import express from 'express';
import {json} from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { vanessaRouter } from './routes/vanessa';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(vanessaRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, ()=>{
  console.log('Listening on 3000')
})
