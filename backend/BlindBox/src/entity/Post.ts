import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  imageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  // 关联作者
  @ManyToOne(() => User, user => user.posts, { eager: true })
  author: User;

  // 一对多评论
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
