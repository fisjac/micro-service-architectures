import express, {Request, Response} from 'express';
import { currentUser } from '@jf-ticketing/common';


const router = express.Router();

router.get('/api/users/currentuser',
  (req,res,next) => {
    next()
  },
  currentUser,
  (req: Request, res: Response) => {
    res.send({currentUser: req.currentUser || null})
  }
);

export { router as currentUserRouter};
