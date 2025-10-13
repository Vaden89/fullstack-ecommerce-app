import { HttpStatus, Injectable } from '@nestjs/common';
import { InviteAdminDTO } from './dto/invite-admin.dto';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomHttpException } from '~/helpers/custom.exception';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import { User, UserRoles } from '../user/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    private mailService: MailService,
    private tokenService: TokenService,
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async inviteAdmin(invitationInfo: InviteAdminDTO) {
    const admin = await this.userRepository.findOne({
      where: {
        email: invitationInfo.email,
      },
    });

    if (admin) {
      throw new CustomHttpException(
        `Admin with email ${invitationInfo.email} already exists on the platform`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.tokenService.generateToken(
      {
        email: invitationInfo.email,
        firstName: invitationInfo.firstName,
        lastName: invitationInfo.lastName,
      },
      { expiresIn: '24h' },
    );

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    const regUrl = `${frontendUrl}/admin/register?token=${token}`;

    void Promise.all([
      this.mailService.sendMail({
        subject: 'Invitation to Shopco',
        to: invitationInfo.email,
        template: 'admin-invitation',
        context: {
          registrationLink: regUrl,
        },
      }),
    ]);
  }

  async getAdminById(adminId: string) {
    const admin = await this.userRepository.findOne({
      where: {
        id: adminId,
        role: UserRoles.ADMIN,
      },
    });

    if (!admin) {
      throw new CustomHttpException(
        `No admin with id ${adminId} found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return admin;
  }
}
