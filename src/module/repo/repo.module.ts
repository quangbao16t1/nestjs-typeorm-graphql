import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../user/author.entity';
import { Post } from '../post/post.entity';
import RepoService from './repo.service';
import { RepoController } from './repo.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Author, Post])],
  controllers: [RepoController],
  providers: [RepoService],
  exports: [RepoService],
})

export class RepoModule {}
