import InventoryModel, { Inventory } from "../models/inventory.model";

export const create = async (payload: Inventory): Promise<Inventory> => {
    const res = await InventoryModel.create(payload)
    return res
};

export const findContextTotalStats = async (
    type: string,
    context: string
): Promise<Inventory[]> => {
    const res = await InventoryModel.aggregate([
        // { $match: { created_by: created_by}},
        { $group: { 
            _id: `$${context}`,
            total: type == 'price' ? { $sum: '$inventory_price'} : { $count: {}}
        }},
        { $project: {
            _id: 0, 
            context: '$_id',
            total: 1
        }},
        { $sort: { count: -1 }},
        { $limit: 7}
    ])
    return res
};
