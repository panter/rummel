import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class UpdateMaterialsDepotAssetInput {
  @IsUUID(4)
  @Field()
  materialsDepotId!: string;

  @Field(() => [String])
  newAssetIds!: string[];

  @Field(() => [String])
  removedAssetIds!: string[];
}
