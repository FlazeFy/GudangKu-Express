import mongoose from "mongoose";
import HistoryModel, { History } from "../../src/modules/history/models/history.model";
import { create, findAll } from "../../src/modules/history/services/history.service";

jest.mock("../../src/modules/history/models/history.model"); 

describe("Test History", () => {
    test("1. POST - History", async () => {
        const mockHistory: History = {
            _id: new mongoose.Types.ObjectId(),
            history_type: "History 1",
            history_context: "Apa ini?",
            createdAt: new Date().toString(),
        };
        (HistoryModel.create as jest.Mock).mockResolvedValue(mockHistory)

        const history = await create(mockHistory)

        // Assertions
        expect(history?._id).toBe(mockHistory._id);
        expect(HistoryModel.create).toHaveBeenCalledWith(mockHistory)
    });
    test("2. GET - All History", async () => {
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

        const allHistories = await findAll(10,2)

        expect(allHistories.length).toBeGreaterThan(0)
        expect(allHistories).toEqual(mockHistories)
        expect(HistoryModel.find).toHaveBeenCalledWith({})
        expect(mockFind.populate).toHaveBeenCalledWith()
    });
});
