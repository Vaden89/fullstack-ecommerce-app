import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomHttpException } from '~/helpers/custom.exception';
import { trySafe } from '~/helpers/try-safe';
import { JwtPayload } from '~/types/token.type';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  extractTokenFromHeader(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      throw new CustomHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const [type, token] = authHeader.split(' ');

    if (type.toLocaleLowerCase() !== 'bearer')
      throw new CustomHttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return token;
  }

  async verifyToken(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const [error, payload] = await trySafe(() =>
      this.jwtService.verifyAsync<JwtPayload>(token, { secret }),
    );

    if (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new CustomHttpException(
          'Authoriztion token has Expired',
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new CustomHttpException(
        'Invalid Authorization token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return payload;
  }

  async generateToken(
    payload: Record<string, unknown>,
    options?: JwtSignOptions,
  ) {
    const [error, token] = await trySafe(() =>
      this.jwtService.signAsync({ ...payload }, options),
    );

    if (error) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return token;
  }
}
