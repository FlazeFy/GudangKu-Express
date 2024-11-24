import { query } from "express";
import DictionaryModel, { Dictionary } from "../models/dictionary.model";
import { TRequestCreateDictionaryBody } from "../validators/dictionary.validator";
import { Types } from "mongoose";

export interface IFindAll {
    limit: number
    page: number
}

export const create = async (payload: TRequestCreateDictionaryBody): Promise<Dictionary> => {
    const res = await DictionaryModel.create(payload);  
    return res;
};

export const findAll = async (limit: number = 12, page: number = 1, dictionary_type: string ): Promise<Dictionary[]> => {
    // Handle multiple search
    const query: any = {}
    if (dictionary_type) {
        const types = dictionary_type.split(',').map(type => type.trim())
        query.dictionary_type = { $in: types }
    }    

    // Query
    const res = await DictionaryModel.find(query)
        .select('dictionary_type dictionary_name -_id')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ 
            dictionary_type : 1,
            dictionary_name : 1
        })

    return res
};

export const isUsedName = async ( dictionary_name: string, dictionary_type: string ): Promise<boolean> => {
    // Query
    const res = await DictionaryModel.findOne({
        dictionary_name: { $regex: `^${dictionary_name}$`, $options: "i" },
        dictionary_type: dictionary_type
    });

    return res ? true : false
};

export const hardDelete = async (id: string): Promise<Dictionary | null> => {
    const id_obj = new Types.ObjectId(id)
    const result = await DictionaryModel.findOneAndDelete({
        _id: id_obj,
    });
    return result;
};
