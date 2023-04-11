import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVoteDto {
  @Field()
  vote: string;
}
