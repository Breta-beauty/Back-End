import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  wallpaper: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  profile_picture: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString()
  @IsOptional()
  services: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString()
  @IsOptional()
  schedule: string[];
}
