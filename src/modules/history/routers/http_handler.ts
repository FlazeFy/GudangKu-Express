import express from "express";
import controller from "../controllers/history.controller";

const router = express.Router();

router.route("/history")
    .get(controller.findAll)
    .post(controller.create);

export default router;
