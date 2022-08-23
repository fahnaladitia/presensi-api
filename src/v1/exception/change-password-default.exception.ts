import { UnauthorizedException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class ChangePasswordDefaultException extends UnauthorizedException {
  constructor() {
    super({
      code: CodeException.CHANGE_PASSWORD_DEFAULT_EXCEPTION,
      error: {
        message: TextMessage.CHANGE_PASSWORD_DEFAULT_MESSAGE,
      },
    });
  }
}
