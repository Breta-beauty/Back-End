import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class FindByInput {
  @Field({ nullable: true })
  @Length(2, 100, { message: 'Debes ingresar por lo menos 3 caracteres' })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  type?: 'customer' | 'salon' = 'customer';

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  service?: string;
}
