import { Inject, Controller, Get,Post, Query, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ApiOperation, ApiBody, ApiTags } from '@midwayjs/swagger';
import { LoginDTO } from '../interface';
import { RegisterDTO } from '../interface';



@ApiTags('用户模块')
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;


  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() dto: LoginDTO) {
    return await this.userService.login(dto);
  }


  @Post('/register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDTO })
  async register(@Body() dto: RegisterDTO) {
    return await this.userService.register(dto);
  }


  @Get('/get_user')
  async getUser(@Query('id') id) { 
    return await this.userService.getUser(id);
  }
}
