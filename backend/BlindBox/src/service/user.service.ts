import { Provide } from '@midwayjs/core';
import { User } from '../entity/User';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../interface';

@Provide()
export class UserService {
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

    return {
      success: true,
      message: 'Login successful',
      data: user,
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


}
