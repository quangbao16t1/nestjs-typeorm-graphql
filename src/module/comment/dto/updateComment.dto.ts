import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentDto {
  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  attachment: string;

  @Field({ nullable: true })
  publish: boolean;
}
