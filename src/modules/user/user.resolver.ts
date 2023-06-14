import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../authn/auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/jwt-auth.guard';
import { ConfirmEmailInput } from '../email/dto/confirm-email.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('user_id', { type: () => Int }) user_id: string) {
    return this.userService.findOne(user_id);
  }

  @Query(() => [User], { name: 'findByName' })
  findUsersByName(
    @Args('name', { type: () => String }) name: string,
    @Args('type', { nullable: true }) type: 'customer' | 'salon' = 'customer',
  ) {
    return this.userService.findByName(name, type);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('user_id') user_id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user_id, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('user_id', { type: () => Int }) user_id: string) {
    return this.userService.remove(user_id);
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  login(@Args('loginUserInput') loginUserInput: LoginInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  confirmEmail(
    @Args('confirmEmailInput') confirmEmailInput: ConfirmEmailInput,
  ) {
    return this.userService.confirm(confirmEmailInput);
  }
}
