import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonLogger } from 'src/share/common/logger/common.logger';
import { Like, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  public async createComment({
    createCommentDto,
    user_id,
  }: {
    createCommentDto: CreateCommentDto;
    user_id: number;
  }): Promise<Comment> {
    try {
      const commentCreate = await this.commentRepository.create({
        user_id,
        ...createCommentDto,
      });

      return await this.commentRepository.save(commentCreate);
    } catch (error) {
      CommonLogger.log({ message: `CREATE_COMMENT_SERVICE_ERROR` });
    }
  }

  public async updateComment({
    updateCommentDto,
    user_id,
    comment_id,
  }: {
    updateCommentDto: CreateCommentDto;
    user_id: number;
    comment_id: number;
  }): Promise<Comment> {
    try {
      const commentUpdate = await this.commentRepository.findOne({
        user_id,
        id: comment_id,
      });

      if (!commentUpdate)
        throw new HttpException(
          'Comment not found or User is not the author of the comment',
          HttpStatus.NOT_FOUND,
        );

      Object.assign(commentUpdate, updateCommentDto);

      return await this.commentRepository.save(commentUpdate);
    } catch (error) {
      CommonLogger.log({ message: `CREATE_COMMENT_SERVICE_ERROR` });
    }
  }
}
