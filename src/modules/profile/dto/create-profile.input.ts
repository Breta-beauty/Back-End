import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field({ nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  profile_image: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  location: string;

  @Field(() => [String], { nullable: true })
  services: string[];
}
