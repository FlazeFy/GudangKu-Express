import { encrypt } from "../../../utils/encryption"
import mongoose from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
  telegram_user_id?: string;
  telegram_is_valid: number;
  firebase_fcm_token?: string;
  line_user_id?: string;
  phone?: string;
  timezone?: string;
  createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
    {
        username: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        telegram_user_id: {
            type: Schema.Types.String,
            unique: true,
        },
        telegram_is_valid: {
            type: Schema.Types.Number,
            required:true
        },
        firebase_fcm_token: {
            type: Schema.Types.String,
            unique: true,
        },
        line_user_id: {
            type: Schema.Types.String,
            unique: true,
        },
        phone: {
            type: Schema.Types.String,
            unique: true,
        },
        timezone: {
            type: Schema.Types.String,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    const user = this
    user.password = encrypt(user.password)
    next()
});

UserSchema.pre("updateOne", async function (next) {
    const user = (this as unknown as { _update: any })._update as User
    user.password = encrypt(user.password)
    next()
});

UserSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    return user
};

const UserModel = mongoose.model("users", UserSchema)

export default UserModel
