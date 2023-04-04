import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'posts'})

export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;
    
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    imageCover: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @DeleteDateColumn()
    deleted_at: string;
}