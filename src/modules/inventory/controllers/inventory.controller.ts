import { Request, Response } from "express";
import {
  create,
  findContextTotalStats,
  findInventoryCalendar,
  findInventoryContext,
  findInventoryList
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
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getTotalInventoryCategoryStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_category')
                res.status(result ? 200 : 404).json({
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
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getTotalInventoryRoomStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_room')
                res.status(result ? 200 : 404).json({
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
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getTotalInventoryMerkStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_merk')
                res.status(result ? 200 : 404).json({
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
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getListInventory(req: Request, res: Response) {
        try {
            const result = await findInventoryList('')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory list",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    },
    async getCalendarInventory(req: Request, res: Response) {
        try {
            const result = await findInventoryCalendar('')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory calendar",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    },
    async getInventoryRoom(req: Request, res: Response) {
        try {
            const result = await findInventoryContext('inventory_room','')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory room",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    }
};
