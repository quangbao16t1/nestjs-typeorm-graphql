import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
// @ObjectType()
export class CreateAuthorDto {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
