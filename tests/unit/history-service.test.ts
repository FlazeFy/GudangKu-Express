import mongoose from "mongoose";
import HistoryModel, { History } from "../../src/modules/history/models/history.model";
import { create, findAll } from "../../src/modules/history/services/history.service";

jest.mock("../../src/modules/history/models/history.model"); 

describe("Test History Service", () => {
    test("1. Add History", async () => {
        const mockHistory: History = {
            _id: new mongoose.Types.ObjectId(),
            history_type: "History 1",
            history_context: "Apa ini?",
            createdAt: new Date().toString(),
        };
        (HistoryModel.create as jest.Mock).mockResolvedValue(mockHistory)

        const history = await create(mockHistory)

        // Assertions
        console.log(`Result: ${JSON.stringify(history, null, 2)}\nExpected: ${JSON.stringify(mockHistory, null, 2)}`)
        expect(history?._id).toBe(mockHistory._id);
        expect(HistoryModel.create).toHaveBeenCalledWith(mockHistory)
    });

    test("2. Get All History", async () => {
        const mockHistories: History[] = [
            {
                _id: new mongoose.Types.ObjectId(),
                history_type: "History 1",
                history_context: "Apa ini?",
                createdAt: new Date().toString(),
            },
        ];
        const mockFind = {
            limit: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            populate: jest.fn().mockResolvedValue(mockHistories),
        };
        (HistoryModel.find as jest.Mock).mockReturnValue(mockFind)

        const result = await findAll(10,2)

        // Assertions
        console.log(`Result: ${JSON.stringify(result, null, 2)}\nExpected: ${JSON.stringify(mockFind, null, 2)}`)
        expect(result.length).toBeGreaterThan(0)
        expect(result).toEqual(mockHistories)
        expect(HistoryModel.find).toHaveBeenCalledWith({})
        expect(mockFind.populate).toHaveBeenCalledWith()
    });
});
