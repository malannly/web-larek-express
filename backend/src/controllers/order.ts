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
    payment, email, phone, address, total, items,
  }: Order = req.body;

  // check if all filds are filled
  if (!payment || !email || !address || !phone || total === undefined || !items) {
    return next(new BadRequestError('all fields are required'));
  }

  // checks if the payment is by card or cash
  if (!['card', 'online'].includes(payment)) {
    return next(new BadRequestError('the payment has to be chosen either cash or card'));
  }

  // static method of checking the email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return next(new BadRequestError('wrong email'));
  }

  // checks if the items is an array
  if (!Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError('items cannot be an empty string'));
  }

  try {
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
  } catch (error) {
    return next(new BadRequestError('Error during the creation of the order'));
  }
};

export default setOrder;
