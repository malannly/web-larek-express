import AppError from './base';

class ConflictError extends AppError {
  constructor(message = 'The title is already used') {
    super(message, 409);
  }
}

export default ConflictError;
