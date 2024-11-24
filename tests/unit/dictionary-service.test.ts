import mongoose from "mongoose";
import DictionaryModel, { Dictionary, DictionaryType } from "../../src/modules/dictionary/models/dictionary.model";
import { create, findAll, isUsedName, hardDelete } from "../../src/modules/dictionary/services/dictionary.service";

jest.mock("../../src/modules/dictionary/models/dictionary.model");

describe("Test Dictionary Service", () => {
    test("1. Add Dictionary", async () => {
        const mockDictionary: Dictionary = {
            _id: new mongoose.Types.ObjectId(),
            dictionary_type: DictionaryType.inventory_category,
            dictionary_name: "Fashion",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        (DictionaryModel.create as jest.Mock).mockResolvedValue(mockDictionary);

        const result = await create({
            dictionary_type: DictionaryType.inventory_category,
            dictionary_name: "Fashion",
        });

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockDictionary, null, 2)}`)
        expect(result?._id).toBe(mockDictionary._id);
        expect(DictionaryModel.create).toHaveBeenCalledWith({
            dictionary_type: "inventory_category",
            dictionary_name: "Fashion",
        });
    });

    test("2. Get All Dictionaries", async () => {
        const mockDictionaries: Dictionary[] = [
            {
                _id: new mongoose.Types.ObjectId(),
                dictionary_type: "inventory_category",
                dictionary_name: "Fashion",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];
        const mockFind = {
            select: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockDictionaries),
        };
        (DictionaryModel.find as jest.Mock).mockReturnValue(mockFind);

        const result = await findAll(10, 1, "inventory_category");

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockFind, null, 2)}`)
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual(mockDictionaries);
        expect(DictionaryModel.find).toHaveBeenCalledWith({
            dictionary_type: { $in: ["inventory_category"] },
        });
        expect(mockFind.sort).toHaveBeenCalledWith({
            dictionary_type: 1,
            dictionary_name: 1,
        });
    });

    test("3. Check If Dictionary Name Is Used", async () => {
        const mockDictionary: Dictionary = {
            _id: new mongoose.Types.ObjectId(),
            dictionary_type: "inventory_category",
            dictionary_name: "Fashion",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        (DictionaryModel.findOne as jest.Mock).mockResolvedValue(mockDictionary);

        const result = await isUsedName("Fashion", "inventory_category");

        // Assertions
        expect(result).toBe(true);
        expect(DictionaryModel.findOne).toHaveBeenCalledWith({
            dictionary_name: { $regex: `^Fashion$`, $options: "i" },
            dictionary_type: "inventory_category",
        });
    });

    test("4. Delete Dictionary By ID", async () => {
        const mockDictionary: Dictionary = {
            _id: new mongoose.Types.ObjectId(),
            dictionary_type: "inventory_category",
            dictionary_name: "Fashion",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        (DictionaryModel.findOneAndDelete as jest.Mock).mockResolvedValue(mockDictionary);

        const result = await hardDelete(mockDictionary._id?.toString() || "");

        // Assertions
        expect(result?._id).toBe(mockDictionary._id);
        expect(DictionaryModel.findOneAndDelete).toHaveBeenCalledWith({
            _id: mockDictionary._id,
        });
    });
});
