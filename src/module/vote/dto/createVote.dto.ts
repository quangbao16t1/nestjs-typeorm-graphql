import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVoteDto {
  @Field()
  post_id: number;

  @Field()
  vote: string;
}
