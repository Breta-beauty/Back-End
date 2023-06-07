import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field({ nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  profile_image: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Debes introducir tu nombre' })
  full_name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Debes introducir un número de teléfono' })
  cellphone: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  location: string;
}
