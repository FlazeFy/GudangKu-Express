import { Request, Response } from "express";
import { create, remove, findExisting } from "../services/reminder.service"
import { sendTelegramMessage } from "../../../middlewares/telegram.middleware";
import { IRequestWithUser } from "../../../middlewares/auth.middleware";
import { me } from "../../../modules/user/services/user.service";

export default {
    async create(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if(user_id === undefined){
                res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            } else {
                // Validator
                const check = await findExisting(req.body.inventory_id, req.body.reminder_type, req.body.reminder_context)

                if(check){
                    res.status(409).json({
                        data: null,
                        message: "reminder with same type and context has been used",
                    });
                } else {
                    // Service : Create Reminder
                    const result = await create(req.body)

                    // Middleware : Telegram Chat
                    if(req.body.send_demo){
                        const user = await me(user_id.toString())
                        if(user && user.telegram_user_id && user.telegram_is_valid == 1){
                            const msg = `You have create a reminder. Here's the reminder description for [DEMO], ${req.body.reminder_desc}` 
                            await sendTelegramMessage({
                                user_tele_id: user.telegram_user_id,
                                message: msg,
                            })
                        }
                    }
                    res.status(201).json({
                        data: result,
                        message: "Success create reminder",
                    });
                }
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create reminder",
            });
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const result = await remove(req.params?.id)
        
            res.status(200).json({
                data: result,
                message: "Success delete reminder",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed delete reminder",
            });
        }
    }
};
