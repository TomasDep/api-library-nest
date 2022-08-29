import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HandleErrorsService } from '../common/services/handle-errors.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hanldeErrorService: HandleErrorsService,
    private readonly authService: AuthService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDto } = createUserDto;
      const user: User = this.userRepository.create({
        ...userDto,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.authService.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.hanldeErrorService.handleErrors(error);
    }
  }
}
