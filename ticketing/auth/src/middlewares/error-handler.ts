import {Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export function errorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()})
  };
  console.log('something went wrong', err);
  return res.status(400).send({
    errors: [{ message: 'Something went wrong'}]
  });

};