import express from 'express';

const router = express.Router();

router.get('/api/users/vanessa', (req,res)=> {
  res.send('Love you!')
});

export {router as vanessaRouter};
