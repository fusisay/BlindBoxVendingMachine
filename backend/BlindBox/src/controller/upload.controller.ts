import {
  Controller,
  Post,
  Files,
  Fields,
  Inject,
    Get,
} from '@midwayjs/core';
import { UploadFileInfo } from '@midwayjs/upload';
import { join } from 'path';
import { copyFileSync } from 'fs';
import { ApiBody, ApiTags} from '@midwayjs/swagger';
import { readdirSync } from 'fs';

@ApiTags('上传文件')
@Controller('/api')
export class UploadController {
  @Inject()
  ctx;

  @Post('/upload')
  @ApiBody({
    description: '上传文件',
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
          required: ['file'],
        },
      },
    },
  })
  async upload(@Files() files: UploadFileInfo<string>[], @Fields() fields: any) {
    const uploadDir = join(__dirname, '../../uploads');
    const result = [];

    for (const file of files) {
      const filename = `${file.filename}`;
      const destPath = join(uploadDir, filename);
      console.log('保存文件到：', destPath);
      copyFileSync(file.data, destPath);

      result.push({
        originalName: file.filename,
        url: `http://localhost:7001/uploads/${filename}`,
      });
    }

    return {
      success: true,
      files: result,
    };
  }


  @Get('/files')
  list() {
    const uploadDir = join(__dirname, '../../uploads');
    console.log('Static file serving dir:', join(__dirname, '../../uploads'));
    const files = readdirSync(uploadDir);
    return { files };
  }
}
