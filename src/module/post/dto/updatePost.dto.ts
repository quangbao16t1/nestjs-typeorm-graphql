import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostDto {
  @Field()
  content: string;

  @Field()
  title: string;

  @Field()
  imageCover: string;
}
