import AppError from './base';

class NotFoundError extends AppError {
  constructor() {
    super('Not found', 404);
  }
}

export default NotFoundError;
