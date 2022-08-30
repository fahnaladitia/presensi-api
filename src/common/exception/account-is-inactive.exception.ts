import { UnauthorizedException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class AccountIsInactiveException extends UnauthorizedException {
  constructor() {
    super({
      code: CodeException.ACCOUNT_IS_INACTIVE_EXCEPTION,
      error: {
        message: TextMessage.ACCOUNT_IS_INACTIVE_MESSAGE,
      },
    });
  }
}
