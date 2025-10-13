import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { trySafe } from '~/helpers/try-safe';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User, UserRoles } from '../user/entities/user.entity';
import { UserLoginDTO } from './dto/user-login.dto';
import { TokenService } from '../token/token.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { CustomHttpException } from '~/helpers/custom.exception';
import { ReqResetPasswordDTO } from './dto/req-pwd-reset.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDTO } from './dto/reset-pwd.dto';
import { Request } from 'express';
import { CreateAdminDTO } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private tokenService: TokenService,
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(userDetails: CreateUserDTO) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: userDetails.email,
      },
    });

    if (existingUser) {
      throw new CustomHttpException(
        'User with email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const [error, passwordHash] = await trySafe(() =>
      hash(userDetails.password, 10),
    );

    if (error) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await this.userService.create({
      ...userDetails,
      password: passwordHash,
    });

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email: user.email,
    });

    return { user, token };
  }

  async login(userDetails: UserLoginDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: userDetails.email,
      },
    });

    if (!user) {
      throw new CustomHttpException(
        'Invalid Credentials',
        HttpStatus.BAD_REQUEST,
      );
    }

    const [error, isMatch] = await trySafe(() =>
      compare(userDetails.password, user.password),
    );

    if (error) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!isMatch) {
      throw new CustomHttpException(
        'Invalid Credentials',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.tokenService.generateToken({
      sub: user.id,
      email: user.email,
    });

    return { user, token };
  }

  async requestPasswordReset(reqResetPasswordDto: ReqResetPasswordDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: reqResetPasswordDto.email,
      },
    });

    if (!user) {
      return;
    }

    const token = await this.tokenService.generateToken(
      {
        sub: user.id,
        email: user.email,
        intent: 'pwd_reset',
      },
      { expiresIn: '30min' },
    );

    const now = new Date();

    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);

    user.reset_token = token;
    user.reset_expires_in = expiresAt;

    await this.userRepository.save(user);

    void Promise.all([
      this.mailService.sendMail({
        subject: 'Reset your Shopco password',
        to: user.email,
        template: 'reset-password',
        context: {
          name: user.firstname,
          unsubscribeLink: 'place',
          resetPasswordLink: `${this.configService.get<string>('FRONTEND_URL')}/auth/password-reset?token=${token}`,
        },
      }),
    ]);
  }

  async resetPassword({ password }: ResetPasswordDTO, req: Request) {
    const token = this.tokenService.extractTokenFromHeader(req);

    const tokenPayload = await this.tokenService.verifyToken(token);

    if ((tokenPayload.intent as string) != 'pwd_reset') {
      throw new CustomHttpException(
        'Access to resource denied',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        id: tokenPayload.sub,
      },
    });

    if (!user) {
      throw new CustomHttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.reset_token != token) {
      throw new CustomHttpException(
        'Access to resource denied',
        HttpStatus.FORBIDDEN,
      );
    }

    const now = new Date();
    if (now.getTime() > user.reset_expires_in.getTime()) {
      throw new CustomHttpException('Token expired', HttpStatus.UNAUTHORIZED);
    }

    const [error, passwordHash] = await trySafe(() => hash(password, 10));

    if (error) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    user.password = passwordHash;

    await this.userRepository.save(user);
  }

  async registerAdmin(adminDetails: CreateAdminDTO, req: Request) {
    const token = this.tokenService.extractTokenFromHeader(req);

    const payload = await this.tokenService.verifyToken(token);

    const [error, passwordHash] = await trySafe(() =>
      hash(adminDetails.password, 10),
    );

    if (error) {
      throw new CustomHttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const admin = this.userRepository.create({
      firstname: payload.firstName as string,
      lastname: payload.lastName as string,
      email: payload.email,
      password: passwordHash,
      role: UserRoles.ADMIN,
    });

    return await this.userRepository.save(admin);
  }
}
