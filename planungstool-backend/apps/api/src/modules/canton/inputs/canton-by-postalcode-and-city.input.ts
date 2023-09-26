import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CantonByPostalCodeAndCityInput {
  @Field()
  postalCode!: string;
}
