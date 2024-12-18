import { Request, Response } from "express";
import { create, findContextTotalStats, findInventoryCalendar, findInventoryContext, findInventoryList, findOneDetail, isUsedName } from "../services/inventory.service"
import { findByInventoryId } from "../../reminder/services/reminder.service"
import { me } from "../../../modules/user/services/user.service";
import { sendEmail } from "../../../mailers/mailer";
import path from "path";
import ejs from "ejs";
import * as Yup from "yup";
import { prepareYupMsg } from "../../../utils/helpers";
import { createInventoryValidator, TRequestCreateInventoryBody } from "../validators/inventory.validator";
import { IRequestWithUser } from "../../../middlewares/auth.middleware";
import { res_message_template } from "../../../lang/template.lang";
import { sendTelegramMessage } from "../../../middlewares/telegram.middleware";
import { generatePDF } from "../../../utils/generator";

const mod = 'inventory' 

export default {
    async postInventory(req: IRequestWithUser, res: Response) {
        try {
            const user_id = req.user?.id;
            if (!user_id) {
                return res.status(401).json({
                    data: null,
                    message: "Unauthorized",
                });
            }
    
            // Validator
            await createInventoryValidator.validate(req.body, { abortEarly: false });
            const { inventory_name } = req.body as TRequestCreateInventoryBody;
    
            // Service: Check inventory name availability
            const isUsed = await isUsedName(inventory_name, user_id.toString());
            if (isUsed) {
                return res.status(409).json({
                    status: 'failed',
                    message: `${mod} name ${res_message_template.conflict}`,
                });
            }
    
            const inventory = await create(req.body);
    
            if (!inventory) {
                return res.status(500).json({
                    data: null,
                    message: "Failed to create inventory",
                });
            }
    
            // Mailer and Telegram notification
            const user = await me(user_id.toString());
            const msg = `You have created an inventory called ${inventory.inventory_name}`;
            
            // Template EJS
            const sharedEjsData = {
                inventory: {
                    inventory_name: inventory.inventory_name,
                    id: inventory._id,
                    inventory_category: inventory.inventory_category,
                },
                datetime: inventory.created_at,
                dt: {
                    inventory_desc: inventory.inventory_desc ?? '-',
                    inventory_merk: inventory.inventory_merk ?? '-',
                    inventory_room: inventory.inventory_room,
                    inventory_storage: inventory.inventory_storage ?? '-',
                    inventory_rack: inventory.inventory_rack ?? '-',
                    inventory_price: inventory.inventory_price,
                    inventory_unit: inventory.inventory_unit,
                    inventory_vol: inventory.inventory_vol,
                    inventory_capacity: `${inventory.inventory_capacity_vol ?? '-'} ${inventory.inventory_capacity_unit ?? '-'}`,
                },
                is_favorite: inventory.is_favorite,
                img: `
                    <tr>
                        <th>Image</th>
                        <td>${inventory.inventory_image ? `<img src='${inventory.inventory_image}' alt='${inventory.inventory_image}'/>` : '-'}</td>
                    </tr>`,
            };
    
            if (user?.email) {
                const emailTemplatePath = path.join(__dirname, "../../../mailers/inventory.ejs");
                const emailHtml = await ejs.renderFile(emailTemplatePath, {
                    ...sharedEjsData,
                    type_template: 'email',
                });
    
                await sendEmail(user.email, "Create Item", msg, emailHtml);
            }
    
            if (user?.telegram_user_id && user.telegram_is_valid === 1) {
                const pdfTemplatePath = path.join(__dirname, "../../../mailers/inventory.ejs");
                const pdfHtml = await ejs.renderFile(pdfTemplatePath, {
                    ...sharedEjsData,
                    type_template: 'pdf',
                });
    
                const pdfPath = path.join(__dirname, `../../../temp/inventory_${inventory._id}.pdf`);
                await generatePDF(pdfHtml, pdfPath)
    
                await sendTelegramMessage({
                    user_tele_id: user.telegram_user_id,
                    message: msg,
                    filePath: pdfPath,
                    fileType: "document",
                });
            }
    
            res.status(201).json({
                data: inventory,
                message: "Success create inventory",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({
                    status: 'failed',
                    message: prepareYupMsg(error),
                });
            }
    
            res.status(500).json({
                status: 'error',
                message: "Something went wrong. Please contact admin. " + error,
            });
        }
    },    
    async getTotalInventoryCategoryStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_category')
                res.status(result ? 200 : 404).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getTotalInventoryRoomStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_room')
                res.status(result ? 200 : 404).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getTotalInventoryMerkStats(req: Request, res: Response) {
        try {
            const { type } = req.params

            if(type == 'price' || type == 'item'){
                const result = await findContextTotalStats(type,'inventory_merk')
                res.status(result ? 200 : 404).json({
                    data: result,
                    message: "Success get all inventory",
                });
            } else {
                res.status(404).json({
                    data: null,
                    message: "Total type not valid",
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            }) 
        }
    },
    async getListInventory(req: Request, res: Response) {
        try {
            const result = await findInventoryList('')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory list",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    },
    async getCalendarInventory(req: Request, res: Response) {
        try {
            const result = await findInventoryCalendar('')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory calendar",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    },
    async getInventoryRoom(req: Request, res: Response) {
        try {
            const result = await findInventoryContext('inventory_room','')
            res.status(result ? 200 : 404).json({
                data: result,
                message: "Success get all inventory room",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    },
    async getInventoryDetail(req: Request, res: Response) {
        try {
            const { id } = req.params
            let result_reminder = null
            const result = await findOneDetail('',id)

            if(result){
                result_reminder = await findByInventoryId('',id)
            }
            res.status(result ? 200 : 404).json({
                data: result,
                reminder: result_reminder == null || result_reminder.length == 0 ? null : result_reminder,
                message: "Success get inventory",
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: "something wrong. please contact admin"
            })   
        }
    }
};
