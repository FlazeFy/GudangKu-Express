import { Request, Response } from "express";
import {
  create,
  findAll
} from "../services/dictionary.service"
import { DictionaryPaginationQuery, SimpleIPaginationQuery } from "@/utils/interfaces";

export default {
    async create(req: Request, res: Response) {
        try {
            const result = await create(req.body)
            res.status(201).json({
                data: result,
                message: "Success create dictionary",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create dictionary",
            });
        }
    },
    async findAll(req: Request, res: Response) {
        try {
            const {
                limit = 12,
                page = 1,
                dictionary_type
            } = req.query as unknown as DictionaryPaginationQuery

            const result = await findAll(limit,page,dictionary_type)
            res.status(200).json({
                data: result,
                message: "Success get all dictionary",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all dictionary",
            });
        }
    },
};
