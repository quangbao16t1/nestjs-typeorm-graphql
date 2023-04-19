import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from '../auth/strategy/auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createPost(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: any,
  ): Promise<any> {
    const { sub: user_id } = user;

    return await this.commentService.createComment({ createCommentDto, user_id });
  }

  @UseGuards(AuthGuard)
  @Put('id')
  async updatePost(
    @Body() updateCommentDto: CreateCommentDto,
    @User() user: any,
    @Param('id') id: number,
  ): Promise<any> {
    const { sub: user_id } = user;

    return await this.commentService.updateComment({ updateCommentDto, user_id, comment_id: id });
  }
}
