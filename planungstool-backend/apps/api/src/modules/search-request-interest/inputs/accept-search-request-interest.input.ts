import { Field, InputType, Int } from '@nestjs/graphql';
import { IsUUID, Min, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class AssignBuildingComponentInput {
  @Field()
  @IsUUID(4)
  buildingComponentId!: string;

  @Field(() => Int)
  @Min(1, { context: { minLength: 1 } })
  amount!: number;

  @Field(() => Int, { nullable: true })
  @Min(0, { context: { minLength: 0 } })
  @ValidateIf((o) => o.amountReserved !== undefined)
  amountReserved?: number;
}

@InputType()
export class AcceptSearchRequestInterestInput {
  @Field()
  @IsUUID(4)
  interestId!: string;

  @Field(() => AssignBuildingComponentInput)
  @ValidateNested()
  @Type(() => AssignBuildingComponentInput)
  buildingComponent!: AssignBuildingComponentInput;
}
