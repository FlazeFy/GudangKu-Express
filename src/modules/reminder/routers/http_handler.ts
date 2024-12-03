import express from "express";
import controller from "../controllers/reminder.controller";
import authMiddleware from "../../../middlewares/auth.middleware";

const router = express.Router();

router.route("/reminder")
    .post([authMiddleware], controller.create)
    .delete(controller.delete);

export default router;
