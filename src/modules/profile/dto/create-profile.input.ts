import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  description: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @IsDate()
  birthday: Date;

  @Field({ nullable: true })
  @IsString()
  gender: 'male' | 'female' | 'undetermined' = 'undetermined';
}
