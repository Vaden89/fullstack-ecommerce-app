import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { UserLoginDTO } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { ReqResetPasswordDTO } from './dto/req-pwd-reset.dto';
import { ResetPasswordDTO } from './dto/reset-pwd.dto';
import { Request } from 'express';
import { CreateAdminDTO } from './dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticateUser(@Body() userLoginDto: UserLoginDTO) {
    const data = await this.authService.login(userLoginDto);

    return {
      success: true,
      data,
      message: 'Login Successful',
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    const data = await this.authService.register(createUserDto);

    return {
      success: false,
      data,
      message: 'User created successfully',
    };
  }

  @Post('req-password-reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body() reqResetPasswordDto: ReqResetPasswordDTO) {
    await this.authService.requestPasswordReset(reqResetPasswordDto);

    return {
      success: true,
      data: null,
      message: 'Reset link sent to your email',
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDTO,
    @Req() req: Request,
  ) {
    await this.authService.resetPassword(resetPasswordDto, req);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }

  @Post('admin/register')
  @HttpCode(HttpStatus.CREATED)
  async registerAdmin(
    @Body() createdAdminDto: CreateAdminDTO,
    @Req() req: Request,
  ) {
    const data = await this.authService.registerAdmin(createdAdminDto, req);

    return {
      success: false,
      data,
      message: 'Admin account created successfully',
    };
  }
}
