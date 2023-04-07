import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwt_config } from 'src/config/constant.config';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import CommentResolver from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    JwtModule.register({
      secret: jwt_config.SECRET,
      signOptions: { expiresIn: jwt_config.EXPIRES_IN },
    }),
  ],
  controllers: [
    CommentController
  ],
  providers: [
    CommentService,
    CommentResolver,
    JwtStrategy
  ],
  exports: [],
})

export class CommentModule{}
