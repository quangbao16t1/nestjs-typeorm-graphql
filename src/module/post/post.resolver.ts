import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { CurrentUser, User } from 'src/decorator/user.decorator';
import RepoService from 'src/module/repo/repo.service';
import { AuthGuard } from '../auth/strategy/auth.guard';
import { GqlAuthGuard } from '../auth/strategy/gql-auth.guard';
import { Comment } from '../comment/comment.entity';
import { Author } from '../user/author.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Post } from './post.entity';

@Resolver((of) => Post)
class PostResolver {
  constructor(private readonly repoService: RepoService) {}

  // @ResolveProperty()
  // public async author(@Parent() parent): Promise<Author> {
  //   return this.repoService.authorRepo.findOne(parent.authorId);
  // }

  @Query((returns) => [Post])
  public async getPosts(): Promise<Post[]> {
    return await this.repoService.postRepo.createQueryBuilder('post').getMany();
  }

  @ResolveField('author', (returns) => Author)
  async getAuthor(@Parent() post: Post) {
    const { user_id } = post;
    
    return await this.repoService.authorRepo.findOne({ id: user_id });
  }

  @ResolveField('comments', (returns) => [Comment])
  async getComments(@Parent() post: Post) {
    const { id } = post;
    return await this.repoService.commentRepo.find({ post_id: id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Post)
  public async createPost(
    @Args('data') data: CreatePostDto,
    @CurrentUser() author: any,
  ): Promise<Post> {
    const { content, imageCover, title } = data;
    const { sub: user_id } = author;

    const user = await this.repoService.authorRepo.findOne({
      where: { id: user_id },
    });

    if (!user) throw new GraphQLError('Author does not exist!!!');

    const post = await this.repoService.postRepo.create({
      content,
      imageCover,
      title,
      user_id,
    });

    return await this.repoService.postRepo.save(post);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Post)
  public async updatePost(
    @Args('data') data: UpdatePostDto,
    @CurrentUser() author: any,
    @Args('id') id: number
  ) {
    const { sub: user_id } = author;
    const postUpdate = await this.repoService.postRepo.findOne({ id, user_id });
    
    if (!postUpdate) throw new GraphQLError('Post dose not exist or User is not the author');
  
    Object.assign(postUpdate, data);

    return await this.repoService.postRepo.save(postUpdate);
  }

  @Query(returns => Post)
  async getPostById(@Args('id') id: number): Promise<Post> {
    return await this.repoService.postRepo.findOne({ id });
  }
}

export default PostResolver;
