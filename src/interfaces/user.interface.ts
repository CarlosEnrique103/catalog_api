import { Document } from "mongoose";

export enum UserRoleEnum {
  Admin = "admin",
  Guest = "guest",
  Client = "client",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isAdmin: boolean;
  role: UserRoleEnum;
}
