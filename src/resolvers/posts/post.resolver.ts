import { Parent, ResolveProperty, Resolver } from "@nestjs/graphql"
import RepoService from "src/module/repo/repo.service";
import { Author } from "src/module/user/author.entity"

@Resolver()
class PostResolver {
  constructor(private readonly repoService: RepoService) {}

  @ResolveProperty()
  public async author(@Parent() parent): Promise<Author> {
    return this.repoService.authorRepo.findOne(parent.authorId);
  }
}

export default PostResolver;

