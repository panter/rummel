import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class DeleteBuildingComponentAssetInput {
  @IsUUID(4)
  @Field()
  buildingComponentId!: string;

  @IsUUID(4)
  @Field()
  assetId!: string;
}
