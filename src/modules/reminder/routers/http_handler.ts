import express from "express";
import controller from "../controllers/reminder.controller";

const router = express.Router();

router.route("/reminder")
    .post(controller.create)
    .delete(controller.delete);

export default router;
