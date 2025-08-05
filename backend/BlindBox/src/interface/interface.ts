/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  password: string;
  address: string;
  role: "user" | "admin";
}

export class LoginDTO {
  username: string;
  password: string;
}

export class RegisterDTO {
  name: string;
  phone: string;
  address: string;
  password: string;
}