import HistoryModel, { History } from "../models/history.model";

export const create = async (payload: History): Promise<History> => {
    const res = await HistoryModel.create(payload)
    return res
};
export interface IFindAll {
    limit: number
    page: number
}

export const findAll = async (
    limit: number = 12,
    page: number = 1
): Promise<History[]> => {
    const res = await HistoryModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
    return res
};
