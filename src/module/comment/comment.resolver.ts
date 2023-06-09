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
import { Post } from '../post/post.entity';
import { Author } from '../user/author.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Resolver(of => Comment)
class CommentResolver {
  constructor(private readonly repoService: RepoService) {}

  // @ResolveProperty()
  // public async author(@Parent() parent): Promise<Author> {
  //   return this.repoService.authorRepo.findOne(parent.authorId);
  // }

  @Query(returns => [Comment])
  async getAllComments(): Promise<Comment[]> {
    return await this.repoService.commentRepo.find();
  }

  @ResolveField('author', returns => Author)
  async getAuthor(@Parent() comment: Comment): Promise<Author> {
    const { user_id } = comment;

    return await this.repoService.authorRepo.findOne({ id: user_id });
  }

  @ResolveField('post', returns => Post)
  async getPost(@Parent() comment: Comment): Promise<Post> {
    const { post_id } = comment;
    
    return await this.repoService.postRepo.findOne({ id: post_id });
  }

  @ResolveField('childComments', returns => [Comment])
  async getChildren(@Parent() comment: Comment): Promise<Comment[]> {
    const { id } = comment;

    return await this.repoService.commentRepo.find({ parent_id: id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Comment)
  public async createComment(
    @Args('data') data: CreateCommentDto,
    @CurrentUser() author: any,
  ): Promise<Comment> {
    const { post_id, ...payloadCreate } = data;
    const { sub: user_id } = author;

    const post = await this.repoService.postRepo.findOne({
      where: { id: post_id },
    });

    if (!post) throw new GraphQLError('Post does not exist!!!');

    const newComment = await this.repoService.commentRepo.create({
      user_id,
      post_id,
      ...payloadCreate,
    });

    return await this.repoService.commentRepo.save(newComment);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Comment)
  async updateComment(
    @Args('id') id: number,
    @Args('data') data: UpdateCommentDto,
    @CurrentUser() author: any,
  ) {
    const { sub: user_id } = author;
    const commentUpdate = await this.repoService.commentRepo.findOne({
      id,
      user_id,
    });

    if (!commentUpdate) throw new GraphQLError('Comment not found!!!');

    Object.assign(commentUpdate, data);

    return await this.repoService.commentRepo.save(commentUpdate);
  }
}

export default CommentResolver;
