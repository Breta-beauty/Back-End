import { InputType, Field } from '@nestjs/graphql';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsString,
  IsDate,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Debes introducir un correo valido.' })
  @IsNotEmpty({ message: 'El campo email no puede estar vacío.' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @Length(8, 30, {
    message:
      'La contraseña no puede ser menor a 8 caracteres ni superior a 30.',
  })
  password: string;

  @Field()
  @IsString()
  type: 'owner' | 'customer' = 'customer';

  @Field()
  is_verified: true | false = false;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Debes introducir tu nombre' })
  full_name: string;

  @Field()
  @IsString()
  @IsPhoneNumber('MX', {
    message: 'Debes introducir un número de teléfono valido',
  })
  @IsNotEmpty({ message: 'Debes introducir un número de teléfono' })
  cellphone: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  birthday: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  gender: 'male' | 'female' | 'undetermined' = 'undetermined';
}
