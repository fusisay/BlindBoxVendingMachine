import { Inject, Provide } from '@midwayjs/core';
import { User } from '../entity/User';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../interface/interface';
import { JwtService } from '@midwayjs/jwt';
import { UpdateAvatarDTO, UpdateNameDTO, UpdatePhoneDTO, UpdateAddressDTO, UpdatePasswordDTO, UpdateBalanceDTO } from '../interface/user.dto';

@Provide()
export class UserService {
  @Inject()
  jwtService: JwtService;


  @InjectEntityModel(User)
  userModel: Repository<User>;


  async login(loginData: LoginDTO): Promise<any> {
    const name = loginData.username;
    const password = loginData.password;
    const user = await this.userModel.findOne({
      where: { name },
    });

    if (!user) {
      return { success: false, message: 'User not found', data: null };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password', data: null };
    }

    const token = await this.jwtService.sign({ uid: user.id, name: user.name });

    return {
      success: true,
      message: 'Login successful',
      data: { token, user },
    };
  }

  async register(registerData: RegisterDTO): Promise<any> {
    const { name, phone, address, password } = registerData;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ where: { phone } });
    if (existingUser) {
      return { success: false, message: 'User already exists', data: null };
    }

    // Create new user
    const newUser = this.userModel.create({
      name,
      phone,
      address,
      password,
      role: "user", // default role
    });

    await this.userModel.save(newUser);

    return { success: true, message: 'Registration successful', data: newUser };
  }


  async getUser(id: number): Promise<any> {
    const user = await this.userModel.findOne({
      where: { id },
    });

    if (!user) {
      return {success: false, message: "User not found", data: null}; // or throw an error if preferred
    }else {
      return {success: true, message: "User found", data: user};
    }

  }


  async updateAvatar(dto: UpdateAvatarDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.avatar = dto.avatar;
  await this.userModel.save(user);
  return { success: true, message: '头像修改成功' };
}

async updateName(dto: UpdateNameDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.name = dto.name;
  await this.userModel.save(user);
  return { success: true, message: '用户名修改成功' };
}

async updatePhone(dto: UpdatePhoneDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.phone = dto.phone;
  await this.userModel.save(user);
  return { success: true, message: '电话修改成功' };
}

async updateAddress(dto: UpdateAddressDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.address = dto.address;
  await this.userModel.save(user);
  return { success: true, message: '地址修改成功' };
}

async updatePassword(dto: UpdatePasswordDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.password = dto.password; // 实际应加密处理
  await this.userModel.save(user);
  return { success: true, message: '密码修改成功' };
}

async updateBalance(dto: UpdateBalanceDTO) {
  const user = await this.userModel.findOneBy({ id: dto.id });
  if (!user) return { success: false, message: '用户不存在' };

  user.balance += dto.balance;
  await this.userModel.save(user);
  return { success: true, message: '余额修改成功' ,balance: user.balance};

}

}
