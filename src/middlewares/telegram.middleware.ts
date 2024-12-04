import { TELEGRAM_BOT_TOKEN } from "../utils/env";
import { Telegraf } from "telegraf";
import { Context } from "telegraf";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

interface SendTelegramMessageOptions {
  user_tele_id: string;
  message?: string; 
  filePath?: string; 
  fileType?: "photo" | "document"; 
}

export const sendTelegramMessage = async (options: SendTelegramMessageOptions): Promise<void> => {
  const { user_tele_id, message, filePath, fileType } = options;

  try {
    if (message && filePath) {
      await bot.telegram.sendMessage(user_tele_id, message);
      if (fileType === "photo") {
        await bot.telegram.sendPhoto(user_tele_id, { source: filePath });
      } else if (fileType === "document") {
        await bot.telegram.sendDocument(user_tele_id, { source: filePath });
      }
    } else if (message) {
      await bot.telegram.sendMessage(user_tele_id, message);
    } else if (filePath) {
      if (fileType === "photo") {
        await bot.telegram.sendPhoto(user_tele_id, { source: filePath });
      } else if (fileType === "document") {
        await bot.telegram.sendDocument(user_tele_id, { source: filePath });
      }
    } else {
      throw new Error("You must provide either a message, a file, or both.");
    }
  } catch (error) {
    throw new Error(`Failed to send Telegram message`);
  }
};
