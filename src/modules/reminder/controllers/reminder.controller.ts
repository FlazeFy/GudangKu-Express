import { Request, Response } from "express";
import {
  create,
  remove,
  findExisting
} from "../services/reminder.service"

export default {
    async create(req: Request, res: Response) {
        try {
            const check = await findExisting(req.body.inventory_id, req.body.reminder_type, req.body.reminder_context)

            if(check){
                res.status(409).json({
                    data: null,
                    message: "reminder with same type and context has been used",
                });
            } else {
                const result = await create(req.body)
                res.status(201).json({
                    data: result,
                    message: "Success create reminder",
                });
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
