import { NotFoundException } from '@nestjs/common';
import { CodeException, TextMessage } from '../utils';

export class JurusanNotFoundException extends NotFoundException {
  constructor() {
    super({
      code: CodeException.JURUSAN_NOT_FOUND_EXCEPTION,
      error: {
        message: TextMessage.JURUSAN_NOT_FOUND_MESSAGE,
      },
    });
  }
}
