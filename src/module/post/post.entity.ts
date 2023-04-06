import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "../user/author.entity";

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
    @ManyToOne(type => Author, author => author.posts)
    author: Author
}