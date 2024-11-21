import ReminderModel, { Reminder } from "../models/reminder.model";

export const create = async (payload: Reminder): Promise<Reminder> => {
    const res = await ReminderModel.create(payload)
    return res
};
export const remove = async (id: string): Promise<Reminder | null> => {
    const res = await ReminderModel.findOneAndDelete({
        _id: id,
    });
    return res
};
export const findExisting = async (inventory_id: string, reminder_type: string, reminder_context: string): Promise<Reminder | null> => {
    const res = await ReminderModel.findOne({
        inventory_id: inventory_id,
        reminder_type: reminder_type, 
        reminder_context: reminder_context
    })
    return res
};

export const findByInventoryId = async (user_id:string, id:string): Promise<Reminder[]> => {
    const res = await ReminderModel.find({
            // created_by: user_id,
            inventory_id: id
        })
        
    return res
}