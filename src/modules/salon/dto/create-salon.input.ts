import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateSalonInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  salon_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber('MX')
  cellphone: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  main_picture: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  wallpaper: string;

  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  image_gallery?: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => GraphQLJSON)
  @IsNotEmptyObject()
  location: object;

  @Field(() => [GraphQLJSON])
  @IsArray()
  schedule: object[];
}
