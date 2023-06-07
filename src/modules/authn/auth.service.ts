import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { LoginInput } from '../user/dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginInput): Promise<any> {
    const user = await this.userRepo.findOneBy({ email: payload.email });
    if (!user) {
      throw new BadRequestException(['Usuario o contraseña incorrectas']);
    }

    const validatePass = await bcrypt.compare(payload.password, user.password);

    if (!payload.password || validatePass === false) {
      throw new BadRequestException(['Usuario o contraseña incorrectas']);
    }

    return user;
  }

  async login(payload: LoginInput) {
    const user = await this.validateUser(payload);

    const _payload = {
      id: user.user_id,
    };

    return {
      access_token: this.jwtService.sign(_payload),
      user,
    };
  }
}
