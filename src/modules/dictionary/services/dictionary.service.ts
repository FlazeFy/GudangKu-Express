import { query } from "express";
import DictionaryModel, { Dictionary } from "../models/dictionary.model";

export const create = async (payload: Dictionary): Promise<Dictionary> => {
    const res = await DictionaryModel.create(payload)
    return res
};
export interface IFindAll {
    limit: number
    page: number
}

export const findAll = async (
    limit: number = 12,
    page: number = 1,
    dictionary_type: string,
): Promise<Dictionary[]> => {
    const query: any = {}
    if (dictionary_type) {
        const types = dictionary_type.split(',').map(type => type.trim())
        query.dictionary_type = { $in: types }
    }    
    const res = await DictionaryModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ 
            dictionary_type : 1,
            dictionary_name : 1
        })
    return res
};
