import InventoryModel, { Inventory } from "../models/inventory.model";

export const create = async (payload: Inventory): Promise<Inventory> => {
    const res = await InventoryModel.create(payload)
    return res
};

export const findContextTotalStats = async (type: string, context: string): Promise<Inventory[]> => {
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

export const findInventoryList = async (user_id:string): Promise<Inventory[]> => {
    const res = await InventoryModel.find({
            // created_by: user_id,
            deleted_at: null
        })
        .select('inventory_name inventory_vol inventory_unit')
        .sort({ inventory_name: 1 })

    return res
}

export const findInventoryCalendar = async (user_id:string): Promise<Inventory[]> => {
    const res = await InventoryModel.find({
            // created_by: user_id,
            deleted_at: null
        })
        .select('inventory_name inventory_price created_at')
        .sort({ created_at: -1 })
        
    return res
}

export const findInventoryContext = async (context: string, user_id:string): Promise<Inventory[]> => {
    const res = await InventoryModel.aggregate([
        // { $match: { created_by: created_by}},
        { $group: { 
            _id: `$${context}`,
            total: { $count: {}}
        }},
        { $project: {
            _id: 0, 
            context: '$_id',
            total: 1
        }},
        { $sort: { context: -1 }},
    ])
    return res
}

export const findOneDetail = async (user_id:string, id:string): Promise<Inventory | null> => {
    const res = await InventoryModel.findOne({
            // created_by: user_id,
            _id: id
        })
        
    return res
}