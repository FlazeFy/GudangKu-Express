import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema
export interface Reminder {
    _id?: Types.ObjectId
    inventory_id: Types.ObjectId
    reminder_desc: string
    reminder_type: string
    reminder_context: string
    created_at: Date
    created_by: string
    updated_at: Date
}

const reminderSchema = new Schema<Reminder>(
    {
        inventory_id: {
            type: Schema.Types.ObjectId,
            ref: "Inventories",
        },
        reminder_desc: {
            type: String,
            required: true,
        },
        reminder_type: {
            type: String,
            required: true,
        },
        reminder_context: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const ReminderModel = mongoose.model("reminders", reminderSchema)

export default ReminderModel
