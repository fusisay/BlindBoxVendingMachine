import { Provide} from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { CreatePostDto } from '../interface/post.dto';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Provide()
export class PostService {
  @InjectEntityModel(Post)
  postRepo: Repository<Post>;

  @InjectEntityModel(User)
  userRepo: Repository<User>;

  async createPost(dto: CreatePostDto) {
    const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
    if (!author) {
      throw new Error('作者不存在');
    }

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      imageUrl: dto.imageUrl,
      author: author,
    });

    return await this.postRepo.save(post);
  }


   async getPostWithComments(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author', 'comments.replies', 'comments.replies.author']
    });
    if (!post) throw new Error('帖子不存在');
    return post;
  }

  async deletePost(id: number, userId: number) {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['author'] });
    if (!post) throw new Error('帖子不存在');
    if (post.author.id !== userId) throw new Error('无权删除此帖子');

    await this.postRepo.remove(post);
    return { message: '删除成功' };
  }

  async getAllPosts() {
    return await this.postRepo.find({
      relations: ['comments', 'comments.author'],
      order: { createdAt: 'DESC' }
    });
  }
}
