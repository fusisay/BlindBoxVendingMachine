import { MidwayConfig } from '@midwayjs/core';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { tmpdir } from 'os';
import { uploadWhiteList } from '@midwayjs/upload';

dotenv.config();



export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753974490317_1836',
  koa: {
    port: 7001,
    cors: {
      origin: '*', // 或者设置为 'http://localhost:3000' 更安全
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET, // 建议放在 .env 文件里
    expiresIn: '2h', // token 过期时间
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',             // 数据库类型
        host: 'localhost',         // 数据库地址，改成你的
        port: 3306,                // MySQL 默认端口
        username: 'root',          // 数据库用户名
        password: '123456', // 数据库密码，替换为你自己的
        database: 'blindbox',          // 数据库名，替换为你自己的
        synchronize: true,         // 开发环境建议为 true，自动同步实体结构，生产环境关掉
        logging: false,            // 是否打印日志，开发时可以开
        // 配置实体模型
        // entities: [User],

        // 支持如下的扫描形式，为了兼容我们可以同时进行.js和.ts匹配
        entities: [
          'entity',                 // 特定目录
          '**/*.entity.{j,t}s',     // 通配加后缀匹配
        ]
      },
    },
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/uploads',
        dir: join(process.cwd(), 'uploads'), // 确保路径正确
      },
    },

  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/api\/upload/,
  },
} as MidwayConfig;
