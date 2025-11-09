import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReqResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
