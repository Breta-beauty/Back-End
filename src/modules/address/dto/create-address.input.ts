import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  street: string;

  @Field()
  @IsNumber()
  postal_code: number;

  @Field()
  @IsNumber()
  exterior_number: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  interior_number: number;
}
