import BaseError from './base';

class BadRequestError extends BaseError {
  constructor(message = 'BadRequest') {
    super(message, 400);
  }
}

export default BadRequestError;
