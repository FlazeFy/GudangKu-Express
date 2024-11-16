import express from "express";
import controller from "../controllers/inventory.controller";

const router = express.Router();

router.route("/inventory")
    .post(controller.create);

export default router;
