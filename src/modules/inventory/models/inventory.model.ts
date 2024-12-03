import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema
export interface Inventory {
    _id?: Types.ObjectId
    history_type: string
    history_context: string
    inventory_name: string
    inventory_category: string
    inventory_desc?: string
    inventory_merk?: string
    inventory_color?: string
    inventory_room: string
    inventory_storage?: string
    inventory_rack?: string
    inventory_price: number
    inventory_image?: string
    inventory_unit: string
    inventory_vol?: number
    inventory_capacity_unit?: string
    inventory_capacity_vol?: number
    is_favorite: boolean
    is_reminder: boolean
    created_at: Date
    created_by?: Types.ObjectId
    updated_at?: Date
    deleted_at?: Date
}

const inventorySchema = new Schema<Inventory>(
    {
        inventory_name: {
            type: Schema.Types.String,
            required: true,
        },
        inventory_category: {
            type: Schema.Types.String,
            required: true,
        },
        inventory_desc: {
            type: Schema.Types.String,
        },
        inventory_merk: {
            type: Schema.Types.String,
        },
        inventory_color: {
            type: Schema.Types.String,
        },
        inventory_room: {
            type: Schema.Types.String,
            required: true,
        },
        inventory_storage: {
            type: Schema.Types.String,
        },
        inventory_rack: {
            type: Schema.Types.String,
        },
        inventory_price: {
            type: Schema.Types.Number,
            required: true,
        },
        inventory_image: {
            type: Schema.Types.String,
        },
        inventory_unit: {
            type: Schema.Types.String,
            required: true,
        },
        inventory_vol: {
            type: Schema.Types.Number,
        },
        inventory_capacity_unit: {
            type: Schema.Types.String,
        },
        inventory_capacity_vol: {
            type: Schema.Types.Number,
        },
        is_favorite: {
            type: Schema.Types.Boolean,
            required: true,
        },
        is_reminder: {
            type: Schema.Types.Boolean,
            required: true,
        },
        created_at: {
            type: Schema.Types.Date,
            required: true,
            default: Date.now,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        updated_at: {
            type: Schema.Types.Date,
            default: Date.now,
        },
        deleted_at: {
            type: Schema.Types.Date,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const InventoryModel = mongoose.model("inventories", inventorySchema)

export default InventoryModel
