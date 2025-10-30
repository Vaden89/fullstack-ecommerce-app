import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '~/decorators/bypass-auth.decorator';
import { CustomHttpException } from '~/helpers/custom.exception';
import { TokenService } from '~/modules/token/token.service';
import { UserService } from '~/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const token = this.tokenService.extractTokenFromHeader(request);

    if (!token) {
      throw new CustomHttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const userData = await this.tokenService.verifyToken(token);

    if (!userData) {
      throw new CustomHttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { user } = await this.userService.getUser(userData.sub!);

    if (!user) {
      throw new CustomHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    Object.assign(request, {
      user: {
        id: userData.sub,
        role: user.role,
      },
    });

    return true;
  }
}
