import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class UpdateProjectAssetInput {
  @IsUUID(4)
  @Field()
  projectId!: string;

  @Field(() => [String])
  newAssetIds!: string[];

  @Field(() => [String])
  removedAssetIds!: string[];
}
