import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from '~/decorators/roles.decorator';
import { CustomHttpException } from '~/helpers/custom.exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const userRole = context.switchToHttp().getRequest<Request>().user?.role;

    if (!userRole) {
      throw new CustomHttpException(
        'User role is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!roles.includes(userRole)) {
      throw new CustomHttpException(
        'Access to this resource is forbidden',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
