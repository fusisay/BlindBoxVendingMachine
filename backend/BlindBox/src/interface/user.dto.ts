import { Rule, RuleType } from '@midwayjs/validate';

// 修改头像
export class UpdateAvatarDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().min(1).max(7).required())
  avatar: number;
}

// 修改用户名
export class UpdateNameDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;
}

// 修改电话
export class UpdatePhoneDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().pattern(/^\d{11}$/).required())
  phone: string;
}

// 修改地址
export class UpdateAddressDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  address: string;
}

// 修改密码（简单示例）
export class UpdatePasswordDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  password: string;
}

export class UpdateBalanceDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  balance: number;
}
