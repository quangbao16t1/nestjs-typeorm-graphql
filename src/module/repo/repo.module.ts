import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { Post } from '../post/post.entity';
import RepoService from './repo.service';
import { RepoController } from './repo.controller';
import { Comment } from '../comment/comment.entity';
import { Vote } from '../vote/vote.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Author, Post, Comment, Vote])],
  controllers: [RepoController],
  providers: [RepoService],
  exports: [RepoService],
})

export class RepoModule {}
