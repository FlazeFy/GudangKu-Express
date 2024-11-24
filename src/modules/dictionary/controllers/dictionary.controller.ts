import { Request, Response } from "express";
import { create, findAll, isUsedName, hardDelete } from "../services/dictionary.service"
import { DictionaryPaginationQuery } from "@/utils/interfaces";
import { res_message_template } from "../../../lang/template.lang";
import { createValidator, TRequestCreateDictionaryBody } from "../validators/dictionary.validator";
import * as Yup from "yup";
import { prepareYupMsg } from "../../../utils/helpers";
import mongoose from "mongoose";

const mod = 'dictionary' 

export default {
    async create(req: Request, res: Response) {
        try {
            // Validator
            await createValidator.validate(req.body, { abortEarly: false })
            const { dictionary_name, dictionary_type } = req.body as TRequestCreateDictionaryBody

            // Service: Check name dictionary name avaiability
            const isUsed = await isUsedName(dictionary_name, dictionary_type)
            
            if(isUsed){
                res.status(409).json({
                    status: 'failed',
                    message: `${mod} name ${res_message_template.conflict}`,
                });
            } else {
                // Service : Create
                const result = await create({ dictionary_name, dictionary_type })

                // Respond
                res.status(result ? 201 : 500).json({
                    status: result ? 'success' : 'failed',
                    data: result,
                    message: `${mod} ${res_message_template.post_success}`,
                });
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({
                    status: 'failed',
                    message: prepareYupMsg(error),
                });
            }

            const err = error as Error;
            res.status(500).json({
                status: 'error',
                message: res_message_template.unknown_err,
            });
        }
    },
    async findAll(req: Request, res: Response) {
        try {
            // Request : Query
            const {
                limit = 12,
                page = 1,
                dictionary_type
            } = req.query as unknown as DictionaryPaginationQuery

            // Service : Find
            const result = await findAll(limit,page,dictionary_type)
            const total = result.length

            // Respond
            res.status(total > 0 ? 200 : 404).json({
                status: total > 0 ? 'success' : 'failed',
                data: total > 0 ? result : null,
                message: `${mod} ${total > 0 ? res_message_template.get_success : res_message_template.get_fail}`,
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                status: 'error',
                message: res_message_template.unknown_err,
            });
        }
    },
    async deleteById (req: Request, res: Response) {
        try {
            // Request : Query
            const id = req.params.id

            // Validator
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(422).json({
                    status: 'failed',
                    message: `${res_message_template.invalid} id`,
                });
            }

            // Service : Hard delete
            const result = await hardDelete(id)

            // Respond
            res.status(result ? 200 : 404).json({
                status: result ? 'success' : 'failed',
                data: result ?? null,
                message: `${mod} ${result ? res_message_template.delete_success : res_message_template.delete_fail}`,
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({
                status: 'error',
                message: res_message_template.unknown_err,
            });
        }
    },
};
