import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
//   @Field()
//   user_id: number;

  @Field()
  content: string;

  @Field()
  title: string;

  @Field()
  imageCover: string;
}
