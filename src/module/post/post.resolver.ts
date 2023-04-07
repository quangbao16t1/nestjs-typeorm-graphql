import { UseGuards } from "@nestjs/common";
import { Args, Context, Info, Mutation, Parent, ResolveProperty, Resolver } from "@nestjs/graphql"
import { GraphQLError } from "graphql";
import { CurrentUser, User } from "src/decorator/user.decorator";
import RepoService from "src/module/repo/repo.service";
import { AuthGuard } from "../auth/strategy/auth.guard";
import { GqlAuthGuard } from "../auth/strategy/gql-auth.guard";
import { CreatePostDto } from "./dto/createPost.dto";
import { Post } from "./post.entity";

@Resolver()
class PostResolver {
  constructor(private readonly repoService: RepoService) {}

  // @ResolveProperty()
  // public async author(@Parent() parent): Promise<Author> {
  //   return this.repoService.authorRepo.findOne(parent.authorId);
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation( returns => Post)
  public async createPost(
    @Args('data') data: CreatePostDto,
    @CurrentUser() author: any
  ): Promise<Post> {
    const { content, imageCover, title } = data
    const { sub: user_id } = author

    const user = await this.repoService.authorRepo.findOne({
      where: { id: user_id },
    });

    if (!user) throw new GraphQLError('Author does not exist!!!');

    const post = await this.repoService.postRepo.create({
      content,
      imageCover,
      title,
      user_id
    });

    return await this.repoService.postRepo.save(post);
  }
}

export default PostResolver;

