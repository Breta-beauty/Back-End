import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, ILike, In, Repository } from 'typeorm';

import { ProfileService } from '../profile/profile.service';
import { EmailConfirmationService } from '../email/email-confirmation.service';

import { FindByInput } from './dto/findBy.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ConfirmEmailInput } from '../email/dto/confirm-email.input';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private profileService: ProfileService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async create(payload: CreateUserInput): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (user) throw new BadRequestException([['El usuario ya existe']]);

    const saltRounds = 10;
    const password = payload.password;
    const hash = await bcrypt.hash(password, saltRounds);

    payload.password = hash;

    const newUser = this.userRepo.create(payload);

    if (newUser) {
      await this.emailConfirmationService.sendVerificationLink(
        payload.email,
        payload.full_name,
      );
    }
    await this.userRepo.save(newUser);

    await this.profileService.create(newUser.user_id);

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    if (!users) throw new NotFoundException(['No se encontraron usuarios']);

    return users;
  }

  async findBy(findByInput: FindByInput): Promise<User[]> {
    const users = await this.userRepo.find({
      relations: { profile: true },
      where: {
        full_name: ILike(`%${findByInput.name}%`),
        type: findByInput.type || 'customer',
        profile: { services: findByInput.service },
      },
      order: { full_name: 'asc' },
    });
    if (!users || users.length === 0) {
      throw new NotFoundException([
        `Ningún resultado coincide con: ${
          findByInput.name || findByInput.type || findByInput.service
        }`,
      ]);
    }

    return users;
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { user_id },
    });
    if (!user) throw new NotFoundException(['No se encontró al usuario']);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException(['No se encontró al usuario']);

    return user;
  }

  async update(user_id: string, changes: UpdateUserInput) {
    const user = await this.userRepo.findOneBy({ user_id });
    if (!user) throw new NotFoundException(['No se encontró al usuario']);

    if (changes.password) {
      const saltRounds = 10;
      const password = changes.password;
      const hash = await bcrypt.hash(password, saltRounds);
      changes.password = hash;
    }

    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async emailConfirmed(email: string) {
    return await this.userRepo.update(
      { email },
      {
        is_Verified: true,
      },
    );
  }

  public async confirmEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (user.is_Verified) {
      throw new BadRequestException(['Email already confirmed']);
    }
    return await this.emailConfirmed(email);
  }

  async confirm(confirmationData: ConfirmEmailInput) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    return await this.confirmEmail(email);
  }

  async remove(user_id: string) {
    const user = await this.userRepo.findOneBy({ user_id });
    if (!user) throw new NotFoundException(['El usuario no existe']);
  }
}
