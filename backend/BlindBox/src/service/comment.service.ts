import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { CreateCommentDto } from '../interface/comment.dto';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class CommentService {
  @InjectEntityModel(Comment)
  commentRepo: Repository<Comment>;

  @InjectEntityModel(Post)
  postRepo: Repository<Post>;

  @InjectEntityModel(User)
  userRepo: Repository<User>;

  async createComment(dto: CreateCommentDto) {
    const post = await this.postRepo.findOne({ where: { id: dto.postId } });
    if (!post) throw new Error('帖子不存在');

    const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
    if (!author) throw new Error('用户不存在');

    let parentComment = null;
    if (dto.parentCommentId) {
      parentComment = await this.commentRepo.findOne({ where: { id: dto.parentCommentId } });
      if (!parentComment) throw new Error('父评论不存在');
    }

    const comment = this.commentRepo.create({
      content: dto.content,
      post,
      author,
      parentComment
    });

    return await this.commentRepo.save(comment);
  }

  async getCommentsByPost(postId: number) {
    return await this.commentRepo.find({
      where: { post: { id: postId }, parentComment: null },
      relations: ['author', 'replies', 'replies.author'],
      order: { createdAt: 'ASC' }
    });
  }
}
