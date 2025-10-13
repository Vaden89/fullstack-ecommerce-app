import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class ReqResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
