import {
    Controller,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
  
  @ApiTags('Comments')
  @Controller('comments')
  export class CommentController {
    constructor(private readonly commentService: CommentService) {}
  }
  