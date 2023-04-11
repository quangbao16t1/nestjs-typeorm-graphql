import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  post_id: number;

  @Field({ nullable: true })
  parent_id: number;

  @Field()
  content: string;

  @Field({ nullable: true })
  attachment: string;

  @Field({ nullable: true })
  publish: boolean;
}
