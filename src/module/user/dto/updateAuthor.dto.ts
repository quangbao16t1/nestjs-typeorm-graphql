import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorDto {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  gender: boolean;

  @Field({ nullable: true })
  public_address: string;

  @Field({ nullable: true })
  avatar: string;

  @Field()
  nonce: number;
}
