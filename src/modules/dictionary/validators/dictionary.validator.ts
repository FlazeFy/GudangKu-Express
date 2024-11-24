import * as Yup from "yup";
import { DictionaryType } from "../models/dictionary.model";

export const createValidator = Yup.object({
    dictionary_type: Yup.string().required().oneOf(Object.values(DictionaryType)),
    dictionary_name: Yup.string().required().min(2).max(75),
});
export type TRequestCreateDictionaryBody = Yup.InferType<typeof createValidator>;

  