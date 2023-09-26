import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { AbstractAddressData } from './abstract-address.data';

@InputType()
export class CreateAddressInput implements AbstractAddressData {
  @IsString()
  @Field()
  firstName!: string;

  @IsString()
  @Field()
  lastName!: string;

  @IsString()
  @Field()
  @Length(2, 2)
  country!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  city!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  postalCode!: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  street!: string;
}
