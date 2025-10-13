import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';

@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string): boolean {
    if (typeof password != 'string') return false;

    const strongPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return strongPasswordRegex.test(password);
  }

  //es-lint
  defaultMessage(): string {
    return 'Password is not strong enough. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      validator: IsStrongPasswordConstraint,
      options: validationOptions,
      constraints: [],
    });
  };
}
