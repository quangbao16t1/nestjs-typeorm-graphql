import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { Post } from "../post/post.entity";
import { Vote } from "../vote/vote.entity";

@ObjectType()
@Entity({name: 'authors'})
export class Author {
    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column()
    email: string;
    
    @Field()
    @Column()
    first_name: string;

    @Field()
    @Column()
    last_name: string;

    @Field({nullable: true})
    @Column()
    avatar?: string;

    @Field({nullable: true})
    @Column()
    gender?: boolean;

    @Field({nullable: true})
    @Column()
    password?: string;

    @Field({nullable: true})
    @Column()
    public_address?: string;

    @Field({nullable: true})
    @Column()
    nonce?: number;

    @Field()
    @Column()
    is_verified: string;

    @Field()
    @Column()
    is_active: string;

    @Field()
    @CreateDateColumn()
    created_at: string;

    @Field()
    @UpdateDateColumn()
    updated_at: string;

    @Field({nullable: true})
    @DeleteDateColumn()
    deleted_at: string;

    @Field(type => [Post], { nullable: true })
    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @Field(type => [Comment], { nullable: true })
    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];

    @Field(type => [Vote], { nullable: true })
    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[];
}