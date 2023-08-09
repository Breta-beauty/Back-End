import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  employee_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  profile_picture: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber('MX')
  cellphone: string;

}