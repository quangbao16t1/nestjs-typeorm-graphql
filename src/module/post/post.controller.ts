import {
  Body,
  Controller, Delete, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from '../auth/strategy/auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { GetAllPostDto } from './dto/getAllPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('all')
  async getAllPosts(@Body() getAllPostsDto: GetAllPostDto): Promise<any> {
    return await this.postService.getAllPosts(getAllPostsDto);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @User() user: any ): Promise<any> {
    const { sub: user_id } = user;

    return await this.postService.createPost({createPostDto, user_id});
  }

  @Put('id')
  async updatePost(@Body() updatePostDto: UpdatePostDto, @User() user: any, @Param('id') post_id: number ): Promise<any> {
    const { sub: user_id } = user;

    return await this.postService.updatePost({updatePostDto, user_id, post_id});
  }

  @UseGuards(AuthGuard)
  @Delete('id')
  async deletePost(@User() user: any, @Param('id') post_id: number ): Promise<any> {
    const { sub: user_id } = user;

    return await this.postService.deletePost({user_id, post_id});
  }
}
