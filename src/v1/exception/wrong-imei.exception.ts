import { UnauthorizedException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class WrongImeiException extends UnauthorizedException {
  constructor() {
    super({
      code: CodeException.WRONG_IMEI_EXCEPTION,
      error: {
        message: TextMessage.WRONG_IMEI_MESSAGE,
      },
    });
  }
}
