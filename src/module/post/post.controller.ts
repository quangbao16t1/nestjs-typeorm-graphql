import {
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('User')
@Controller('users')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
}
