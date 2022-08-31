import { NotFoundException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class ProgramStudiNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: CodeException.PROGRAM_STUDI_NOT_FOUND_EXCEPTION,
      error: {
        message: TextMessage.PROGRAM_STUDI_NOT_FOUND_MESSAGE,
      },
    });
  }
}
