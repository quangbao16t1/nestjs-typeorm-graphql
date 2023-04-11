import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Author } from '../user/author.entity';

@ObjectType()
@Entity({ name: 'votes' })
export class Vote {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  post_id: number;

  @Field()
  @Column()
  vote: string;

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: string;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deleted_at: string;

  @Field((type) => [Author], { nullable: false })
  @ManyToOne(() => Author, (author) => author.votes)
  @JoinColumn({ name: 'user_id' })
  author: Author;

  @Field((type) => [Post], { nullable: false })
  @ManyToOne(() => Post, (post) => post.votes)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
