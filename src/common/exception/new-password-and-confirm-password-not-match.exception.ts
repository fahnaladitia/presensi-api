import { BadRequestException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class NewPasswordAndConfirmPasswordNotMatchException extends BadRequestException {
  constructor() {
    super({
      code: CodeException.NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH_EXCEPTION,
      error: {
        message:
          TextMessage.NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH_MESSAGE,
      },
    });
  }
}
