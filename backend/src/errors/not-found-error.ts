import BaseError from './base';

class NotFoundError extends BaseError {
  constructor() {
    super('Not found', 404);
  }
}

export default NotFoundError;
