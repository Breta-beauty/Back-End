import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VerifyCallback } from 'passport-google-oauth20';

@InputType()
export class GoogleLoginInput {
  @Field()
  @IsEmail({}, { message: 'Debes introducir un correo valido.' })
  @IsNotEmpty({ message: 'El campo email no puede estar vacío.' })
  email: string;

  @Field()
  is_verified: true | false;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Debes introducir tu nombre' })
  full_name: string;

  @Field()
  @IsString()
  @IsOptional()
  profile_picture?: string;

  done?: VerifyCallback;
}
