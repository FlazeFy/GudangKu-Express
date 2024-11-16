import { faker } from "@faker-js/faker";
import dictionaryModel from "../models/dictionary.model";

const rulesDictionaryType = ['report_category','inventory_category']
export const dictionaryFactory = async (overrides = {}) => {
    const dictionaryData = {
        dictionary_name: faker.word.noun(),
        dictionary_type: rulesDictionaryType[Math.floor(Math.random() * rulesDictionaryType.length)],
        ...overrides,
    };

    return await dictionaryModel.create(dictionaryData)
};
export const createDictionaries = async (count: number, overrides = {}) => {
    const dictionaries = [];
    for (let i = 0; i < count; i++) {
        dictionaries.push(await dictionaryFactory(overrides))
    }
    return dictionaries;
};