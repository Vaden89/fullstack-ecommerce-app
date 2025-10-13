import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsStrongPassword } from '~/decorators/is-strong-password.decorator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
