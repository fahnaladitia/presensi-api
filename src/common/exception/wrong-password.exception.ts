import { UnauthorizedException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class WrongPasswordException extends UnauthorizedException {
  constructor() {
    super({
      code: CodeException.WRONG_PASSWORD_EXCEPTION,
      error: {
        message: TextMessage.WRONG_PASSWORD_MESSAGE,
      },
    });
  }
}
