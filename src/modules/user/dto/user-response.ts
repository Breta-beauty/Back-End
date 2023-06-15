import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@ObjectType()
export class userResponse {
  @Field(() => User)
  user: User;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
