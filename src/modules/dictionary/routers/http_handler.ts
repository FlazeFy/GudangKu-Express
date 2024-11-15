import express from "express";
import controller from "../controllers/dictionary.controller";

const router = express.Router();

router.route("/dictionary")
    .get(controller.findAll)
    .post(controller.create);

export default router;
