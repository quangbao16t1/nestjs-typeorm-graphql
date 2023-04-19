import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonLogger } from 'src/share/common/logger/common.logger';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { GetAllPostDto } from './dto/getAllPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  public async getAllPosts(getAllPostsDto: GetAllPostDto): Promise<any> {
    try {
      const {
        keyword = '',
        limit = 10,
        page = 1,
        // filter = '',
      } = getAllPostsDto;
      const take = +limit;
      const skip = (page - 1) * limit;

      const [result, total] = await this.postRepository.findAndCount({
        where: [{ title: Like(`%${keyword}%`) }],
        take: take,
        skip: skip,
      });

      return {
        page,
        page_size: take,
        total_page: Math.ceil(total / take),
        total_item: total,
        result,
      };
    } catch (error) {
      CommonLogger.log({ message: `GET_ALL_POSTS_SERVICE_ERROR` });
    }
  }

  public async getPostById(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({ id });

      if (!post)
        throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);

      return post;
    } catch (error) {
      CommonLogger.log({ message: `GET_POST_BY_ID_SERVICE_ERROR` });
    }
  }

  public async createPost({
    createPostDto,
    user_id,
  }: {
    createPostDto: CreatePostDto;
    user_id: number;
  }): Promise<Post> {
    try {
      const postCreate = await this.postRepository.create({
        user_id,
        ...createPostDto,
      });

      return await this.postRepository.save(postCreate);
    } catch (error) {
      CommonLogger.log({ message: `CREATE_POST_SERVICE_ERROR` });
    }
  }

  public async updatePost({
    updatePostDto,
    user_id,
    post_id,
  }: {
    updatePostDto: UpdatePostDto;
    user_id: number;
    post_id: number;
  }): Promise<Post> {
    try {
      const postUpdate = await this.postRepository.findOne({
        id: post_id,
        user_id,
      });

      if (!postUpdate)
        throw new HttpException(
          'Post not found or User is not the author of the post',
          HttpStatus.NOT_FOUND,
        );

      Object.assign(postUpdate, updatePostDto);

      return await this.postRepository.save(postUpdate);
    } catch (error) {
      CommonLogger.log({ message: `UPDATE_POST_SERVICE_ERROR` });
    }
  }

  public async deletePost({
    user_id,
    post_id,
  }: {
    user_id: number;
    post_id: number;
  }): Promise<any> {
    try {
      const postDelete = await this.postRepository.findOne({
        id: post_id,
        user_id,
      });

      if (!postDelete)
        throw new HttpException(
          'Post not found or User is not the author of the post',
          HttpStatus.NOT_FOUND,
        );

      return await this.postRepository.remove(postDelete);
    } catch (error) {
      CommonLogger.log({ message: `DELETE_POST_SERVICE_ERROR` });
    }
  }
}
