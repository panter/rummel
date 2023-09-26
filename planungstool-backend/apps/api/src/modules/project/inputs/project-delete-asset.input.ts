import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class DeleteProjectAssetInput {
  @IsUUID(4)
  @Field()
  projectId!: string;

  @IsUUID(4)
  @Field()
  assetId!: string;
}
