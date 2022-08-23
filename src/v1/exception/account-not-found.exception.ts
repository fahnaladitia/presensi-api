import { NotFoundException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class AccountNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: CodeException.ACCOUNT_NOT_FOUND_EXCEPTION,
      error: {
        message: TextMessage.ACCOUNT_NOT_FOUND_MESSAGE,
      },
    });
  }
}
