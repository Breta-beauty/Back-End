import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({ message: 'El nombre de usuario no puede estar vacío.' })
  username: string;

  @Field()
  @IsEmail()
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
  type: 'salon' | 'customer' = 'customer';

  @Field()
  is_Verified: true | false = false;
}
