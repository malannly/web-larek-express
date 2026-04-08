import type { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find() || [];

    res.status(200).send({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(error);
  }
};

export const setProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send(product);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Validation error during the creation of the product'));
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('The product with this title has already exists'));
    }

    return next(error);
  }
};
