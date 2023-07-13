import express from 'express';
import {json} from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { vanessaRouter } from './routes/vanessa';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(vanessaRouter);


app.listen(3000, ()=>{
  console.log('Listening on 3000')
})
