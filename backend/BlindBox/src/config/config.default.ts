import { MidwayConfig } from '@midwayjs/core';
// import { User } from '../entity/User';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753974490317_1836',
  koa: {
    port: 7001,
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
} as MidwayConfig;
