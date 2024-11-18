import { Request, Response } from "express";
import {
  create,
  findContextTotalStats
} from "../services/inventory.service"

export default {
    async create(req: Request, res: Response) {
        try {
            const result = await create(req.body)
            res.status(201).json({
                data: result,
                message: "Success create inventory",
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed create inventory",
            });
        }
    },
    async findTotalInventoryCategoryStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_category')
                res.status(200).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all inventory",
            });
        }
    },
    async findTotalInventoryRoomStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_room')
                res.status(200).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all inventory",
            });
        }
    },
    async findTotalInventoryMerkStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_merk')
                res.status(200).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                data: err.message,
                message: "Failed get all inventory",
            });
        }
    },
};
