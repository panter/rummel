import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ConnectRelationInput {
  @IsUUID(4)
  @Field({ nullable: true })
  id?: string | null;
}

@InputType()
export class EntityIdInput {
  @IsUUID(4)
  @Field({ nullable: true })
  id?: string | null;
}

@ArgsType()
export class FindOneEntityWhereArgs {
  @Field(() => EntityIdInput, { nullable: true })
  where!: EntityIdInput;
}

@ObjectType()
export class ReferenceId {
  @Field()
  id!: string;
}
