import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-error';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    message: err.message || 'Internal Server Error',
  });
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => next(new NotFoundError());
