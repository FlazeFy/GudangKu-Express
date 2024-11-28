import * as Yup from "yup";
import { HistoryType } from "../models/history.model";

export const createValidator = Yup.object({
    history_type: Yup.string().required().oneOf(Object.values(HistoryType)),
    history_context: Yup.string().required().min(2).max(255),
});
export type TRequestCreateHistoryBody = Yup.InferType<typeof createValidator>;

  