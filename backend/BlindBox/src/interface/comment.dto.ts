import { ApiProperty } from '@midwayjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '这是评论内容' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}
