import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(payload: CreateUserInput) {
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (user) throw new BadRequestException('El usuario ya existe');

    const saltRounds = 10;
    const password = payload.password;
    const hash = await bcrypt.hash(password, saltRounds);

    payload.password = hash;

    const newUser = this.userRepo.create(payload);

    return this.userRepo.save(newUser);
  }

  async findAll() {
    const users = await this.userRepo.find();
    if (!users) throw new NotFoundException('No se encontraron usuarios');

    return users;
  }

  async findOne(user_id: number) {
    const user = await this.userRepo.findOne({
      where: { user_id },
    });
    if (!user) throw new NotFoundException('No se encontró al usuario');

    return user;
  }

  async update(user_id: number, changes: UpdateUserInput) {
    const user = await this.userRepo.findOneBy({ user_id });
    if (!user) throw new NotFoundException('No se encontró al usuario');

    if (changes.password) {
      const saltRounds = 10;
      const password = changes.password;
      const hash = await bcrypt.hash(password, saltRounds);
      changes.password = hash;
    }

    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async remove(user_id: number) {
    const user = await this.userRepo.findOneBy({ user_id });
    if (!user) throw new NotFoundException('El usuario no existe');
  }
}
