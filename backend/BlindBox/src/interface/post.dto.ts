import { ApiProperty } from '@midwayjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: '我的第一篇帖子' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '这是帖子内容' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'http://example.com/img.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  authorId: number;
}
