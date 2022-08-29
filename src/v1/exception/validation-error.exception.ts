import { BadRequestException } from '@nestjs/common';
import { CodeException } from '../utils';

export class ValidationErrorException extends BadRequestException {
  constructor(errors: any[]) {
    super({
      code: CodeException.VALIDATION_ERROR_EXCEPTION,
      error: errors,
    });
  }
}
