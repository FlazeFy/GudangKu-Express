import express from "express";
import controller from "../controllers/user.controller";

const router = express.Router();

router.route("/login").post(controller.login)
router.route("/register").post(controller.register)

const module_prefix = '/user'
const prefixRouter = express.Router()
prefixRouter.get('/', controller.get_my_profile)
prefixRouter.put('/', controller.edit_profile)
router.use(module_prefix, prefixRouter)

export default router;
