import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRoles } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { CustomHttpException } from '~/helpers/custom.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(userId: string): Promise<{ user: User }> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new CustomHttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    return { user };
  }

  async create(userDetails: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      password: userDetails.password,
      role: UserRoles.ADMIN,
    });

    return await this.userRepository.save(user);
  }
}
