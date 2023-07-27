import express, {Request, Response, NextFunction} from 'express';

import { requireAuth, NotAuthorizedError } from '@jf-ticketing/common';

const router = express.Router();

router.post('/api/tickets',
// (req: Request, res: Response, next: NextFunction) => {
//   // console.log('currentUser in requireAuth middleware:', req.currentUser)
//   if (!req.currentUser) {
//     console.log('before throw error')
//     throw new NotAuthorizedError();
//   };
//   next();
// },
requireAuth,
(req: Request, res: Response) => {
  res.sendStatus(201);
});

export {router as createTicketRouter};
