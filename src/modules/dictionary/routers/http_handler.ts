import express from "express";
import controller from "../controllers/dictionary.controller";

const router = express.Router();

router.route("/dictionary")
    .get(controller.findAll)
    .post(controller.create);
router.route("/dictionary/:id").delete(controller.deleteById);

export default router;
