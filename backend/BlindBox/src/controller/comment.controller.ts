import { Controller, Post as HttpPost, Get, Body, Param, Inject } from '@midwayjs/core';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../interface/comment.dto';

@ApiTags(['评论管理'])
@Controller('/api/comments')
export class CommentController {
  @Inject()
    commentService: CommentService;

  @HttpPost('/')
  @ApiOperation({ summary: '发表评论' })
  async create(@Body() dto: CreateCommentDto) {
    return await this.commentService.createComment(dto);
  }

  @Get('/post/:postId')
  @ApiOperation({ summary: '获取某帖的所有评论（包含回复）' })
  async list(@Param('postId') postId: number) {
    return await this.commentService.getCommentsByPost(postId);
  }
}
