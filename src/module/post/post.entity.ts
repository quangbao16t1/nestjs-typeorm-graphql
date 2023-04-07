import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "../user/author.entity";
import { Comment } from "../comment/comment.entity";
import { Vote } from "../vote/vote.entity";

@ObjectType()
@Entity({name: 'posts'})
export class Post {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    user_id: number;
    
    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    content: string;

    @Field({nullable: true})
    @Column()
    imageCover: string;

    @Field()
    @CreateDateColumn()
    created_at: string;


    @Field()
    @UpdateDateColumn()
    updated_at: string;

    @Field({nullable: true})
    @DeleteDateColumn()
    deleted_at: string;

    @Field(type => [Author], { nullable: false})
    @ManyToOne(() => Author, author => author.posts)
    @JoinColumn({ name: 'user_id' })
    author: Author

    @Field(type => [Comment], { nullable: true })
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @Field(type => [Vote], { nullable: true })
    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[];
}