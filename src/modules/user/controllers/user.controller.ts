import { Request, Response } from "express";
import UserModel, { User } from "../models/user.model";
import { IRequestWithUser } from "../../../middlewares/auth.middleware";
import * as Yup from "yup";
import { login, register, updateProfile } from "../services/user.service";
import { ObjectId } from "mongoose";
import { prepareYupMsg } from "../../../utils/helpers";

const registerSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Your password confirmation is not same"
    ),
});

const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

type TLoginBody = Yup.InferType<typeof loginSchema>;
type TRegisterBody = Yup.InferType<typeof registerSchema>;

interface IRequestLogin extends Request {
  body: TLoginBody;
}

interface IRequestRegister extends Request {
  body: TRegisterBody;
}

export default {
    async login(req: IRequestLogin, res: Response) {
        try {
            const { email, password } = req.body;
            await loginSchema.validate({ email, password });
            const token = await login({ email, password });
            res.status(200).json({
                message: "login success",
                data: token,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({
                    status: 'failed',
                    message: prepareYupMsg(error),
                });
            }

            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async register(req: IRequestRegister, res: Response) {
        try {
            const { email, password, username, confirm_password } =
                req.body;
            const telegram_is_valid = 0

            await registerSchema.validate({
                email,
                password,
                username,
                confirm_password,
            });

            const user = await register({
                email,
                username,
                password,
                telegram_is_valid
            });

            res.status(200).json({
                message: "account is registered",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async get_my_profile(req: IRequestWithUser, res: Response) {
        try {
            const id = req.user?.id;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(403).json({
                    message: "user not found",
                    data: null,
                });
            }

            res.status(200).json({
                message: "user fetched",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async edit_profile(req: IRequestWithUser, res: Response) {
        try {
            const id = req.user?.id;
            const result = await updateProfile(
                id as unknown as ObjectId,
                req.body as User
            );
            res.status(200).json({
                message: "profile has been updated",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
};