import InventoryModel, { Inventory } from "../models/inventory.model";

export const create = async (payload: Inventory): Promise<Inventory> => {
    const res = await InventoryModel.create(payload)
    return res
};