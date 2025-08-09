import { Controller, Post as HttpPost, Get, Body, Del, Param, Inject } from '@midwayjs/core';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../interface/post.dto';

@ApiTags(['帖子管理'])
@Controller('/api/posts')
export class PostController {
  @Inject()
  postService: PostService;

  @HttpPost('/')
  @ApiOperation({ summary: '发布新帖子（可带图片）' })
  async create(@Body() dto: CreatePostDto) {
    return await this.postService.createPost(dto);
  }

  @Get('/:id')
  @ApiOperation({ summary: '根据ID获取帖子详情(含评论)' })
  async getPostById(@Param('id') id: number) {
    return await this.postService.getPostWithComments(id);
  }




  @Del('/:id/:userId')
  @ApiOperation({ summary: '删除帖子（只能删除自己的）' })
  async delete(@Param('id') id: number, @Param('userId') userId: number) {
    return await this.postService.deletePost(id, userId);
  }

  @Get('/')
  @ApiOperation({ summary: '获取所有帖子' })
  async list() {
    return await this.postService.getAllPosts();
  }
}
