import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationErrorException } from '../exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);

      this.transformErrorMessage(errors);
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types: Type<any>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private transformErrorMessage(errors: ValidationError[]) {
    const transformMessage: any[] = [];
    errors.forEach((v) => {
      transformMessage.push({
        field: v.property,
        errors: v.constraints,
      });
    });
    throw new ValidationErrorException(transformMessage);
  }
}
