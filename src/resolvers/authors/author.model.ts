import { Field, InputType, ObjectType } from '@nestjs/graphql';
import PostInput from '../posts/post.model';

@InputType()
@ObjectType()
class AuthorInput {
  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  gender: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  public_address: string;

  @Field({ nullable: true })
  nonce: number;
}

export default AuthorInput;
