import HistoryModel, { History } from "../models/history.model";

export interface IFindAll {
    limit: number
    page: number
}

export const create = async (payload: History): Promise<History> => {
    const res = await HistoryModel.create(payload)
    return res
};

export const findAll = async (limit: number = 12, page: number = 1): Promise<History[]> => {
    const res = await HistoryModel.find()
        .select('history_type history_context createdAt')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
    return res
};

export const remove = async (id: string): Promise<History | null> => {
    const result = await HistoryModel.findOneAndDelete({
        _id: id,
    });
    return result;
};