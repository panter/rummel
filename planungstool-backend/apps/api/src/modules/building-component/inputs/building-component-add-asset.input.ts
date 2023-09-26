import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class UpdateBuildingComponentAssetInput {
  @IsUUID(4)
  @Field()
  buildingComponentId!: string;

  @Field(() => [String])
  newAssetIds!: string[];

  @Field(() => [String])
  removedAssetIds!: string[];
}
