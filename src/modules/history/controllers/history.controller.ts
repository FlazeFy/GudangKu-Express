import { Request, Response } from "express";
import { create, findAll, remove} from "../services/history.service"
import { SimpleIPaginationQuery } from "@/utils/interfaces";
import { res_message_template } from "../../../lang/template.lang";
import * as Yup from "yup";
import { prepareYupMsg } from "../../../utils/helpers";
import { createValidator, TRequestCreateHistoryBody } from "../validators/history.validator";

const mod = 'histories' 

export default {
    async create(req: Request, res: Response) {
        try {
            // Validator
            await createValidator.validate(req.body, { abortEarly: false })

            // Service : Create
            const result = await create(req.body)

            // Respond
            res.status(result ? 201 : 500).json({
                status: result ? 'success' : 'failed',
                data: result,
                message: `${mod} ${res_message_template.post_success}`,
            });
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
                message: res_message_template.unknown_err+err.message,
            });
        }
    },
    async findAll(req: Request, res: Response) {
        try {
            // Request : Query
            const { limit = 12, page = 1 } = req.query as unknown as SimpleIPaginationQuery

            // Service : Find
            const result = await findAll(limit,page)
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
    async deleteById(req: Request, res: Response) {
        try {
            // Request : Query
            const id = req.params.id

            // Service : Hard delete
            const result = await remove(id)

            // Respond
            res.status(result ? 201 : 500).json({
                status: result ? 'success' : 'failed',
                data: result,
                message: `${mod} ${res_message_template.delete_success}`,
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
