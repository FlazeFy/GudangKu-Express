import { Request, Response } from "express";
import {
  create
} from "../services/inventory.service"

export default {
    async create(req: Request, res: Response) {
        try {
            const result = await create(req.body)
            res.status(201).json({
                data: result,
                message: "Success create history",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create history",
            });
        }
    },
};
