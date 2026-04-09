import BaseError from './base';

class ConflictError extends BaseError {
  constructor(message = 'The title is already used') {
    super(message, 409);
  }
}

export default ConflictError;
