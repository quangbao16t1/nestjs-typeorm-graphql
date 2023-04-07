import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import { Vote } from '../vote/vote.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepo: Repository<Author>,
    @InjectRepository(Post) public readonly postRepo: Repository<Post>,
    @InjectRepository(Comment) public readonly commentRepo: Repository<Comment>,
    @InjectRepository(Vote) public readonly voteRepo: Repository<Vote>,
  ) {}
}

export default RepoService;
