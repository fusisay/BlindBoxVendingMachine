import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  // 关联评论者
  @ManyToOne(() => User, user => user.comments, { eager: true })
  author: User;

  // 关联的帖子
  @ManyToOne(() => Post, post => post.comments, {onDelete: 'CASCADE'})
  post: Post;

  // 可选：父评论（用于回复评论）
  @ManyToOne(() => Comment, comment => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  parentComment: Comment;

  @OneToMany(() => Comment, comment => comment.parentComment)
  replies: Comment[];

}
