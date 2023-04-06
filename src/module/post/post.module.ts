import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwt_config } from 'src/config/constant.config';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import PostResolver from './post.resolver';
import {  PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
    PostResolver
  ],
  exports: [],
})

export class PostModule{}
