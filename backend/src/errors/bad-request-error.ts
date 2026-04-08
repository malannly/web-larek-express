import AppError from './base';

class BadRequestError extends AppError {
  constructor(message = 'BadRequest') {
    super(message, 400);
  }
}

export default BadRequestError;
