import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @IsNumber()
  @Min(0)
  @Field(() => Int, { defaultValue: 0 })
  skip = 0;

  @IsNumber()
  @Min(1)
  @Field(() => Int, { defaultValue: 10 })
  take = 10;
}
