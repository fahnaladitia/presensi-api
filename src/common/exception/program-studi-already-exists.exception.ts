import { BadRequestException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class ProgramStudiAlreadyExistsException extends BadRequestException {
  constructor() {
    super({
      code: CodeException.PROGRAM_STUDI_ALREADY_AXISTS_EXCEPTION,
      error: {
        message: TextMessage.PROGRAM_STUDI_ALREADY_AXISTS_MESSAGE,
      },
    });
  }
}
