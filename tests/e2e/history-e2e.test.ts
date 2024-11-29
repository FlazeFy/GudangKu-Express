import request from "supertest";

const baseURL = "http://127.0.0.1:3000"

describe("Test History API (E2E)", () => {
    // GET - All History
    test("GET All History - Should find history (Positive Case)", async () => {
        interface History {
            history_context: string
            history_type: string
        }
        // Request
        const response = await request(baseURL).get(`/api/v2/history`).send();

        // Check template respond
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.message).toContain("found")

        // Check items
        const data = response.body.data 
        expect(Array.isArray(data)).toBe(true)
        data.forEach((el: History) => { 
            expect(el).toHaveProperty("history_type")
            expect(typeof el.history_type).toBe("string")
    
            expect(el).toHaveProperty("history_context")
            expect(typeof el.history_context).toBe("string")
        });
    });

    // POST - Add History
    test("POST Add History - Should show created item (Positive Case)", async () => {
        const payload = {
            history_context: "Remove Item A from Report A",
            history_type: "Create",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/history").send(payload);

        // Check template respond
        expect(response.status).toBe(201)
        expect(response.body.status).toBe("success")
        expect(response.body.message).toContain("created")

        // Check items
        const data = response.body.data
        expect(typeof data).toBe("object")
        expect(data).toHaveProperty("_id")
        expect(data).toHaveProperty("createdAt")
        expect(data).toHaveProperty("history_context")
        expect(data).toHaveProperty("history_type")

        expect(data.history_context).toBe(payload.history_context)
        expect(data.history_type).toBe(payload.history_type)
        expect(typeof data._id).toBe("string")
        expect(typeof data.createdAt).toBe("string")
    });

    test("POST Add History - Should show failed message when history name to short (Negative Case)", async () => {
        const payload = {
            history_context: "A",
            history_type: "Create",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/history").send(payload);

        // Check template respond
        expect(response.status).toBe(422)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("history context must be at least 2 characters")
    });

    test("POST Add History - Should show failed message when history type invalid (Negative Case)", async () => {
        const payload = {
            history_context: "Pencil A",
            history_type: "Delete Apps",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/history").send(payload);

        // Check template respond
        expect(response.status).toBe(422)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("history type must be one of the following values: Update Image, Create, Create Layout, Update item, Recover item, Updated reminder, Permanently delete item, Unset to favorite, Update Layout, Set to favorite, Print item, Delete item, Create Reminder, Delete Reminder, Delete, Delete Storage, Delete Layout, Create Storage, Create Report, Create item, Permanently delete, Permanently delete reminder, Split Report, Delete Report, Update Report Item")
    });

    test("POST Add History - Should show failed message when required field is empty (Negative Case)", async () => {
        const payload = {
            history_context: "Pencil A",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/history").send(payload);

        // Check template respond
        expect(response.status).toBe(422)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("history type is a required field")
    });
});
