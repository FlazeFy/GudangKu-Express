import { TELEGRAM_BOT_TOKEN } from "../utils/env";
import { Telegraf } from "telegraf";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

export const sendTelegramMessage = async (userId: string, message: string): Promise<void> => {
  try {
    await bot.telegram.sendMessage(userId, message);
  } catch (error) {
    throw new Error("Failed to send Telegram message");
  }
};
