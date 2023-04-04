import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { Post } from '../post/post.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepo: Repository<Author>,
    @InjectRepository(Post) public readonly postRepo: Repository<Post>,
  ) {}
}

export default RepoService;
