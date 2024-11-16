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
    created_by: string
    updated_at: Date
    deleted_at?: Date
}

const inventorySchema = new Schema<Inventory>(
    {
        inventory_name: {
            type: String,
            required: true,
        },
        inventory_category: {
            type: String,
            required: true,
        },
        inventory_desc: {
            type: String,
        },
        inventory_merk: {
            type: String,
        },
        inventory_color: {
            type: String,
        },
        inventory_room: {
            type: String,
            required: true,
        },
        inventory_storage: {
            type: String,
        },
        inventory_rack: {
            type: String,
        },
        inventory_price: {
            type: Number,
            required: true,
        },
        inventory_image: {
            type: String,
        },
        inventory_unit: {
            type: String,
            required: true,
        },
        inventory_vol: {
            type: Number,
        },
        inventory_capacity_unit: {
            type: String,
        },
        inventory_capacity_vol: {
            type: Number,
        },
        is_favorite: {
            type: Boolean,
            required: true,
        },
        is_reminder: {
            type: Boolean,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
        created_by: {
            type: String,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true,
            default: Date.now,
        },
        deleted_at: {
            type: Date,
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
