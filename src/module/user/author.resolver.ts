import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from 'src/module/repo/repo.service';
import { Author } from 'src/module/user/author.entity';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Resolver((of) => Author)
class AuthorResolver {
  constructor(private repoService: RepoService) {}

  @Query(() => String)
  async hellooo(): Promise<string> {
    return 'Hello world';
  }

  @Query((returns) => [Author])
  public async getAuthors(): Promise<Author[]> {
    return await this.repoService.authorRepo.find();
  }

  @Query(() => Author, { nullable: true })
  public async getAuthorById(@Args('id') id: number): Promise<Author> {
    return await this.repoService.authorRepo.findOne(id);
  }

  @Mutation( returns => Author)
  public async createAuthor(
    @Args('data') data: CreateAuthorDto,
  ): Promise<Author> {
    const { email, password, first_name, last_name } = data;

    const user = await this.repoService.authorRepo.findOne({ where: { email } });

    if (user) throw new GraphQLError('Author already exists!');

    const hashPassword = await bcrypt.hashSync(password, 12);

    const newAuthor = await this.repoService.authorRepo.create({
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: hashPassword,
    });

    return await this.repoService.authorRepo.save(newAuthor);
  }

  @Mutation( returns => Author)
  public async updateAuthor(
    @Args('id') id: number,
    @Args('data') data: UpdateAuthorDto,
  ): Promise<Author> {
    const { first_name, last_name, nonce, public_address,  avatar, gender} = data;

    const user = await this.repoService.authorRepo.findOne({ where: { id } });

    if (!user) throw new GraphQLError('Author does not exists!');

    // const hashPassword = await bcrypt.hashSync(password, 12);
    Object.assign(user, data)

    // const newAuthor = await this.repoService.authorRepo.update(id, {
    //   nonce: nonce ? nonce : user.nonce,
    //   first_name: first_name ? first_name : user.first_name,
    //   last_name: last_name ? last_name : user.last_name,
    //   public_address: public_address ? public_address : user.public_address,
    //   avatar: avatar ? avatar : user.avatar,
    //   gender: gender ? gender : user.gender,
    // });

    return await this.repoService.authorRepo.save(user);
  }
}

export default AuthorResolver;
