import { Field, InputType } from '@nestjs/graphql';
import { SringQueryMode } from './enums';

@InputType()
export class BoolFilter {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;
}

@InputType()
export class IntFilter {
  @Field(() => Number, { nullable: true })
  equals?: number;

  @Field(() => Number, { nullable: true })
  gt?: number;

  @Field(() => Number, { nullable: true })
  gte?: number;

  @Field(() => Number, { nullable: true })
  lt?: number;

  @Field(() => Number, { nullable: true })
  lte?: number;
}

@InputType()
export class DateTimeFilter {
  @Field(() => Date, { nullable: true })
  equals?: number;

  @Field(() => Date, { nullable: true })
  gt?: string;

  @Field(() => Date, { nullable: true })
  gte?: string;

  @Field(() => Date, { nullable: true })
  lt?: string;

  @Field(() => Date, { nullable: true })
  lte?: string;
}

@InputType()
export class StringFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];

  @Field(() => [String], { nullable: true })
  nin?: string[];

  @Field(() => String, { nullable: true })
  contains?: string[];

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  fulltext?: string;

  // TODO: we currently do not support this, we overall irgnore props named "mode"
  @Field(() => SringQueryMode, { nullable: true })
  mode?: SringQueryMode;
}
