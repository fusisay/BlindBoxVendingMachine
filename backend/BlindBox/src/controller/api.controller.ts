import { Inject, Controller, Get,Post, Query, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ApiOperation, ApiBody, ApiTags } from '@midwayjs/swagger';
import { LoginDTO } from '../interface/interface';
import { RegisterDTO } from '../interface/interface';
import {
  UpdateAvatarDTO,
  UpdateNameDTO,
  UpdatePhoneDTO,
  UpdateAddressDTO,
  UpdatePasswordDTO,
  UpdateBalanceDTO
} from '../interface/user.dto';



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

  @Post('/update/avatar')
@ApiOperation({ summary: '修改头像' })
@ApiBody({ type: UpdateAvatarDTO })
async updateAvatar(@Body() dto: UpdateAvatarDTO) {
  return await this.userService.updateAvatar(dto);
}

@Post('/update/name')
@ApiOperation({ summary: '修改用户名' })
@ApiBody({ type: UpdateNameDTO })
async updateName(@Body() dto: UpdateNameDTO) {
  return await this.userService.updateName(dto);
}

@Post('/update/phone')
@ApiOperation({ summary: '修改电话' })
@ApiBody({ type: UpdatePhoneDTO })
async updatePhone(@Body() dto: UpdatePhoneDTO) {
  return await this.userService.updatePhone(dto);
}

@Post('/update/address')
@ApiOperation({ summary: '修改地址' })
@ApiBody({ type: UpdateAddressDTO })
async updateAddress(@Body() dto: UpdateAddressDTO) {
  return await this.userService.updateAddress(dto);
}

@Post('/update/password')
@ApiOperation({ summary: '修改密码' })
@ApiBody({ type: UpdatePasswordDTO })
async updatePassword(@Body() dto: UpdatePasswordDTO) {
  return await this.userService.updatePassword(dto);
}

@Post('/update/balance')
@ApiOperation({ summary: '修改余额' })
@ApiBody({ type: UpdateBalanceDTO })
async updateBalance(@Body() dto: UpdateBalanceDTO) {
  return await this.userService.updateBalance(dto); 
}

}
