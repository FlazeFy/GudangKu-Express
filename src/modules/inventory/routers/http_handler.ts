import express from "express";
import controller from "../controllers/inventory.controller";

const router = express.Router()
const module_prefix = '/inventory'
router.post(module_prefix, controller.create)

const prefixRouter = express.Router()
prefixRouter.get('/total_by_category/:type', controller.getTotalInventoryCategoryStats)
prefixRouter.get('/total_by_room/:type', controller.getTotalInventoryRoomStats)
prefixRouter.get('/total_by_merk/:type', controller.getTotalInventoryMerkStats)
prefixRouter.get('/calendar', controller.getCalendarInventory)
prefixRouter.get('/list', controller.getListInventory)
prefixRouter.get('/room', controller.getInventoryRoom)
router.use(module_prefix, prefixRouter)

export default router
