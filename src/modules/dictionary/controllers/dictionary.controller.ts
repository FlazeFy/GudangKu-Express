import { Request, Response } from "express";
import dictionaryModel from "../models/dictionary.model";

export default {
    async create(req: Request, res: Response) {
        try {
            const result = await dictionaryModel.create(req.body);
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
            const result = await dictionaryModel.find();
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
