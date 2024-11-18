import express from "express";
import controller from "../controllers/inventory.controller";

const router = express.Router()
const module_prefix = '/inventory'
router.post(module_prefix, controller.create)

const statsRouter = express.Router()
statsRouter.get('/total_by_category/:type', controller.findTotalInventoryCategoryStats)
statsRouter.get('/total_by_room/:type', controller.findTotalInventoryRoomStats)
statsRouter.get('/total_by_merk/:type', controller.findTotalInventoryMerkStats)
router.use(module_prefix, statsRouter)

export default router
