import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Author } from '../user/author.entity';

@ObjectType()
@Entity({ name: 'comments' })
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  post_id: number;

  @Field({ nullable: true})
  @Column()
  parent_id: number;

  @Field()
  @Column()
  content: string;

  @Field({ nullable: true })
  @Column()
  attachment: string;

  @Field({ nullable: true })
  @Column({ default: true })
  publish: boolean;

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: string;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deleted_at: string;

  @Field((type) => Author, { nullable: false })
  @ManyToOne(() => Author, (author) => author.comments)
  @JoinColumn({ name: 'user_id' })
  author: Author;

  @Field((type) => Post, { nullable: false })
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Field(type => [Comment], { nullable: true })
  @OneToMany(() => Comment, comment => comment.parentComment)
  childComments: Comment[];

  @Field(type => Comment, { nullable: false})
  @ManyToOne(() => Comment, comment => comment.childComments)
  @JoinColumn({ name: 'parent_id' })
  parentComment: Comment
}
