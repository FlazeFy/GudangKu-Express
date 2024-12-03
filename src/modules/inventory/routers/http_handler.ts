import express from "express";
import controller from "../controllers/inventory.controller";
import authMiddleware from "../../../middlewares/auth.middleware";

const router = express.Router()
const module_prefix = '/inventory'
const prefixRouter = express.Router()
prefixRouter.get('/total_by_category/:type', controller.getTotalInventoryCategoryStats)
prefixRouter.get('/total_by_room/:type', controller.getTotalInventoryRoomStats)
prefixRouter.get('/total_by_merk/:type', controller.getTotalInventoryMerkStats)
prefixRouter.get('/calendar', controller.getCalendarInventory)
prefixRouter.get('/list', controller.getListInventory)
prefixRouter.get('/detail/:id', controller.getInventoryDetail)
prefixRouter.get('/room', controller.getInventoryRoom)
prefixRouter.post('', [authMiddleware], controller.postInventory)
router.use(module_prefix, prefixRouter)

export default router
