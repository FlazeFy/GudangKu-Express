import { ObjectId } from "mongoose";
import UserModel, { User } from "../models/user.model";
import { generateToken } from "../../../utils/jwt";
import { encrypt } from "../../../utils/encryption"

interface ILoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: ILoginPayload): Promise<string> => {
    const { email, password } = payload;
    const userByEmail = await UserModel.findOne({
        email,
    });

    if (!userByEmail) {
        return Promise.reject(new Error("email: user not found"));
    }
    const validatePassword: boolean = encrypt(password) === userByEmail.password;

    if (!validatePassword) {
        return Promise.reject(new Error("password: user not found"));
    }

    const token = generateToken({
        id: userByEmail._id,
    });

    return token;
};

interface IRegisterPayload {
    email: string;
    username: string;
    password: string;
    telegram_is_valid: number;
}
export const register = async (payload: IRegisterPayload): Promise<User> => {
    const { email,  username, password, telegram_is_valid } = payload;
    const user = await UserModel.create({
        email,
        password,
        username,
        telegram_is_valid
    });

    return user;
};

export const me = async (userId: string): Promise<User> => {
    const user = await UserModel.findById(userId);
    if (!user) {
        return Promise.reject(new Error("user not found"));
    }
    return user;
};
export const updateProfile = async (userId: ObjectId, updateUserData: User) => {
    const result = await UserModel.findByIdAndUpdate(
        userId,
        {
            ...updateUserData,
        },
        {
            new: true,
        }
    );
    if (!result) {
        return Promise.reject(new Error("failed update user"));
    }
    return result;
};
