import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class InviteAdminDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
