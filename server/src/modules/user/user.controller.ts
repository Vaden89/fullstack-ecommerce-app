import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '~/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUser(@Req() req: Request) {
    const userId = req.user.id;

    const data = await this.userService.getUser(userId);

    return {
      success: true,
      data,
      message: 'User details returned successfully',
    };
  }
}
