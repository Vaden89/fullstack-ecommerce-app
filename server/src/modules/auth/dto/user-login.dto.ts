import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
