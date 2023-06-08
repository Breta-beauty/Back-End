import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field({ nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  profile_image: string;

  @Field({ nullable: true })
  @IsString()
  description: string;
}
