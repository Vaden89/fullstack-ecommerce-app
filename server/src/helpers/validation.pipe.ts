import {
  ArgumentMetadata,
  HttpStatus,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CustomHttpException } from './custom.exception';

export class CustomValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object: object =
      value === undefined || value === null
        ? new (metatype as new () => object)()
        : (plainToInstance(metatype, value) as object);

    const validationErrors: ValidationError[] = await validate(object);

    if (validationErrors.length > 0) {
      const invalidFields = validationErrors.map(
        (error: ValidationError) => error.property,
      );

      const errors = validationErrors.map((error: ValidationError) => ({
        field: error.property,
        errors: error.constraints
          ? Object.values(error.constraints)
          : ['Unknown validation error'],
      }));

      const missingRequiredFields = errors
        .filter((error) =>
          error.errors.some((e) => e.includes('should not be empty')),
        )
        .map((error) => error.field);

      const errorMessage =
        missingRequiredFields.length > 0
          ? missingRequiredFields.length === 1
            ? `{${missingRequiredFields[0]} is required}`
            : `{The following fields are required: ${missingRequiredFields.join(', ')}}`
          : invalidFields.length === 1
            ? `{${invalidFields[0]} is invalid}`
            : `${invalidFields.join(', ')} are invalid`;

      throw new CustomHttpException(
        errorMessage,
        HttpStatus.UNPROCESSABLE_ENTITY,
        errors,
      );
    }

    return object;
  }

  private toValidate(metaType: Type): boolean {
    const types: Type[] = [String, Number, Boolean, Array, Object];
    return !types.includes(metaType);
  }
}
