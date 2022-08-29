import { ConflictException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      code: CodeException.EMAIL_ALREADY_EXISTS_EXCEPTION,
      error: {
        message: TextMessage.EMAIL_ALREADY_EXISTS_MESSAGE,
      },
    });
  }
}
