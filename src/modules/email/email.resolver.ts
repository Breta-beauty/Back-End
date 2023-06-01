import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';

@Resolver(() => Email)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}
}
