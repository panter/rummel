import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RejectSearchRequestInterestInput {
  @Field()
  interestId!: string;
  @Field({ nullable: true })
  rejectionReason?: string;
}
