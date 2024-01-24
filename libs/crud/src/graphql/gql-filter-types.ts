import { Field, InputType, TypeMetadataStorage } from '@nestjs/graphql';
import { SringQueryMode } from './enums';
import { typesCache } from './types-cache';

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

  @Field(() => Number, { nullable: true })
  ne?: number;
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

  @Field(() => Date, { nullable: true })
  ne?: string;
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

  @Field(() => String, { nullable: true })
  ne?: string;

  // TODO: we currently do not support this, we overall irgnore props named "mode"
  @Field(() => SringQueryMode, { nullable: true })
  mode?: SringQueryMode;
}

export const enumFilter = (e: any) => {
  const enumMetaData = TypeMetadataStorage.getEnumsMetadata().find(
    (enumMetadata) => enumMetadata.ref === e,
  );

  if (!enumMetaData) {
    return null;
  }

  const name = `${enumMetaData.name}EnumFilter`;

  const cached = typesCache[name];
  if (cached) {
    return cached;
  }

  @InputType(name)
  class EnumFilter {
    @Field(() => e, { nullable: true })
    equals?: string;

    @Field(() => [e], { nullable: true })
    in?: string[];

    @Field(() => [e], { nullable: true })
    nin?: string[];

    @Field(() => e, { nullable: true })
    contains?: string[];

    @Field(() => e, { nullable: true })
    gt?: string;

    @Field(() => e, { nullable: true })
    gte?: string;

    @Field(() => e, { nullable: true })
    lt?: string;

    @Field(() => e, { nullable: true })
    lte?: string;

    @Field(() => e, { nullable: true })
    fulltext?: string;

    @Field(() => e, { nullable: true })
    ne?: string;

    // TODO: we currently do not support this, we overall irgnore props named "mode"
    @Field(() => SringQueryMode, { nullable: true })
    mode?: SringQueryMode;
  }
  typesCache[name] = EnumFilter;
  return EnumFilter;
};
