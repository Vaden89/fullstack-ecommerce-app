import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    response: string,
    status: HttpStatus,
    errors?:
      | string
      | string[]
      | Record<string, unknown>
      | Record<string, unknown>[],
  ) {
    super({ message: response, errors }, status);
  }
}
