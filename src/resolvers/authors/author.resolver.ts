import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/module/repo/repo.service';
import { Author } from 'src/module/user/author.entity';
import AuthorInput from './author.model';

@Resolver((of) => Author)
class AuthorResolver {
  constructor(private repoService: RepoService) {}

  @Query(() => String)
  async hellooo(): Promise<string> {
    return 'Hello world';
  }

  @Query(returns  => [Author])
  public async getAuthors(): Promise<Author[]> {
    return await this.repoService.authorRepo.find();
  }

  @Query(() => Author, { nullable: true })
  public async getAuthorById(@Args('id') id: number): Promise<Author> {
    return await this.repoService.authorRepo.findOne(id);
  }

  // @Mutation(() => Author)
  // public async createAuthor(
  //   @Args('data') input: AuthorInput,
  // ): Promise<Author> {
  //   const author = this.repoService.authorRepo.create({
  //     email: input.email,
  //     first_name: input.first_name,
  //     last_name: input.last_name,
  //     password: input.password,
  //   });

  //   return this.repoService.authorRepo.save(author);
  // }
}

export default AuthorResolver;
