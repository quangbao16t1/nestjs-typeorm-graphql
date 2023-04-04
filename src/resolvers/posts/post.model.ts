import { Int } from '@nestjs/graphql';
import { Field, InputType } from 'type-graphql';
import AuthorInput from '../authors/author.model';

@InputType()
class PostAuthorConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class PostAuthorInput {
  @Field({ nullable: true })
  readonly connect: PostAuthorConnectInput;

  @Field({ nullable: true })
  readonly create: AuthorInput;
}

@InputType()
class PostInput {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;
}

export default PostInput;
