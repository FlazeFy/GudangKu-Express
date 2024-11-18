import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { User } from "@/modules/user/models/user.model";

export interface IUserToken
  extends Omit<
    User,
    | "password"
    | "email"
    | "username"
    | "telegram_is_valid"
  > {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "3h",
  });
  return token;
};
export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
