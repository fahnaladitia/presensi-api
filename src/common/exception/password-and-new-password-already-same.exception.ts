import { BadRequestException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class PasswordAndNewPasswordAlreadySameException extends BadRequestException {
  constructor() {
    super({
      code: CodeException.PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME_EXCEPTION,
      error: {
        message: TextMessage.PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME_MESSAGE,
      },
    });
  }
}
