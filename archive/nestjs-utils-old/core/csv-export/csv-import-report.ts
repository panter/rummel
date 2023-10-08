import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RowMessage {
  @Field()
  index!: number;
  @Field()
  message!: string;
}

@ObjectType()
export class CsvImportReport {
  @Field()
  rowsImported: number = 0;
  @Field(() => [RowMessage])
  errors: RowMessage[] = [];
  @Field(() => RowMessage)
  warnings: RowMessage[] = [];
}
