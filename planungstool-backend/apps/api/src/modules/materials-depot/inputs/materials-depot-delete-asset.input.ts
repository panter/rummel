import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class DeleteMaterialsDepotAssetInput {
  @IsUUID(4)
  @Field()
  materialsDepotId!: string;

  @IsUUID(4)
  @Field()
  assetId!: string;
}
