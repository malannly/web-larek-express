import type { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

interface Order {
    payment: 'card' | 'online',
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}

const setOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    total, items,
  }: Order = req.body;

  // checks if the items is an array and if it
  if (!Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError('items cannot be an empty string'));
  }

  const products = await Product.find({ _id: { $in: items } });

  if (products.length !== items.length) {
    return next(new BadRequestError('the products are not found'));
  }

  const invalidProduct = products.find((p) => p.price === undefined);

  if (invalidProduct) {
    return next(new BadRequestError('the product is not found'));
  }

  const sum = products.reduce((acc, p) => acc + (p.price ?? 0), 0);
  if (sum !== total) {
    return next(new BadRequestError('wrong sum of the order'));
  }

  const orderId = faker.string.uuid();
  return res.status(200).send({
    id: orderId,
    total,
  });
};

export default setOrder;
