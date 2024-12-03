import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET: string = process.env.SECRET || "secret";
export const TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN || "secret";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
