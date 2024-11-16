import { Request, Response } from "express";
import {
  create,
  findAll
} from "../services/history.service"
import { SimpleIPaginationQuery } from "@/utils/interfaces";

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
    async findAll(req: Request, res: Response) {
        try {
            const {
                limit = 12,
                page = 1,
            } = req.query as unknown as SimpleIPaginationQuery

            const result = await findAll(limit,page)
            res.status(200).json({
                data: result,
                message: "Success get all history",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all history",
            });
        }
    },
};
