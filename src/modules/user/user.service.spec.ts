import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User]), EmailModule, JwtModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a user', async () => {
      expect(
        service.create({
          username: 'Saf-ire',
          email: '10Saf.ire@gmail.com',
          password: 'Ancient_Ire',
          full_name: 'Derek Alvarado',
          cellphone: '6142558626',
          gender: 'male',
          type: 'customer',
          is_Verified: false,
          birthday: new Date('2001-10-18'),
        }),
      ).toReturn();
    });
  });
});
