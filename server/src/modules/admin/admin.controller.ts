import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { InviteAdminDTO } from './dto/invite-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('invite')
  async inviteAdmin(@Body() inviteAdminDto: InviteAdminDTO) {
    const data = await this.adminService.inviteAdmin(inviteAdminDto);

    return {
      success: true,
      data,
      message: 'Invitation sent to admin successfully',
    };
  }
}
