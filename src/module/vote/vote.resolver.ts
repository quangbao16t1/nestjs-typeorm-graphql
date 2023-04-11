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
import { Comment } from '../comment/comment.entity';
import { Vote } from './vote.entity';
import { CreateVoteDto } from './dto/createVote.dto';
import { UpdateVoteDto } from './dto/updateVote.dto';

@Resolver(of => Vote)
class VoteResolver {
  constructor(private readonly repoService: RepoService) {}

  // @ResolveProperty()
  // public async author(@Parent() parent): Promise<Author> {
  //   return this.repoService.authorRepo.findOne(parent.authorId);
  // }

  @Query(returns => [Vote])
  async getAllVotes(): Promise<Vote[]> {
    return await this.repoService.voteRepo.find();
  }

  @ResolveField('author', returns => Author)
  async getAuthorOfVote(@Parent() vote: Vote): Promise<Author> {
    const { user_id } = vote;

    return await this.repoService.authorRepo.findOne({ id: user_id });
  }

  @ResolveField('post', returns => Post)
  async getPostOfVote(@Parent() vote: Vote): Promise<Post> {
    const { post_id } = vote;
    
    return await this.repoService.postRepo.findOne({ id: post_id });
  }

  @ResolveField('comments', (returns) => [Comment])
  async getComments(@Parent() post: Post) {
    const { id } = post;
    return await this.repoService.commentRepo.find({ post_id: id, parent_id: null });
  }

  @ResolveField('childComments', returns => [Comment])
  async getChildren(@Parent() comment: Comment): Promise<Comment[]> {
    const { id } = comment;

    return await this.repoService.commentRepo.find({ parent_id: id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Vote)
  public async createVote(
    @Args('data') data: CreateVoteDto,
    @CurrentUser() author: any,
  ): Promise<Vote> {
    const { post_id, ...payloadCreate } = data;
    const { sub: user_id } = author;

    const post = await this.repoService.postRepo.findOne({
      where: { id: post_id },
    });

    if (!post) throw new GraphQLError('Post does not exist!!!');

    const newVote = await this.repoService.voteRepo.create({
      user_id,
      post_id,
      ...payloadCreate,
    });

    return await this.repoService.voteRepo.save(newVote);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Vote)
  async updateVote(
    @Args('id') id: number,
    @Args('data') data: UpdateVoteDto,
    @CurrentUser() author: any,
  ) {
    const { sub: user_id } = author;
    const voteUpdate = await this.repoService.voteRepo.findOne({
      id,
      user_id,
    });

    if (!voteUpdate) throw new GraphQLError('Vote not found!!!');

    if (voteUpdate.vote === 'up') Object.assign(voteUpdate)

    return await this.repoService.voteRepo.save(voteUpdate);
  }
}

export default VoteResolver;
