import request from "supertest";

const baseURL = "http://127.0.0.1:3000"

describe("Test Dictionary API (E2E)", () => {
    const new_dictionary_name = "Room A3"

    // GET - Dictionary By Type
    test("GET Dictionary By Type - Should find dictionary with search using type (Positive Case)", async () => {
        interface Dictionary {
            dictionary_name: string
            dictionary_type: string
        }
        // Request
        const dictionary_type = 'inventory_category'
        const response = await request(baseURL).get(`/api/v2/dictionary?dictionary_type=${dictionary_type}`).send();

        // Check template respond
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        expect(response.body.message).toContain("found")

        // Check items
        const data = response.body.data 
        expect(Array.isArray(data)).toBe(true)
        data.forEach((el: Dictionary) => { 
            expect(el).toHaveProperty("dictionary_name")
            expect(typeof el.dictionary_name).toBe("string")
    
            expect(el).toHaveProperty("dictionary_type")
            expect(typeof el.dictionary_type).toBe("string")
    
            expect(el.dictionary_name.length).toBeGreaterThanOrEqual(2)
        });
    });

    test("GET Dictionary By Type - Should show failed message for invalid dictionary type search (Negative Case)", async () => {
        const dictionary_type = 'inventory'
        // Request
        const response = await request(baseURL).get(`/api/v2/dictionary?dictionary_type=${dictionary_type}`).send();

        // Check template respond
        expect(response.status).toBe(404)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("found")
        expect(response.body.data).toBe(null)
        expect(typeof response.body.data).toBe("object")
    });

    // POST - Add Dictionary
    test("POST Add Dictionary - Should show created item (Positive Case)", async () => {
        const payload = {
            dictionary_name: new_dictionary_name,
            dictionary_type: "inventory_room",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/dictionary").send(payload);

        // Check template respond
        expect(response.status).toBe(201)
        expect(response.body.status).toBe("success")
        expect(response.body.message).toContain("created")

        // Check items
        const data = response.body.data
        expect(typeof data).toBe("object")
        expect(data).toHaveProperty("_id")
        expect(data).toHaveProperty("createdAt")
        expect(data).toHaveProperty("dictionary_type")
        expect(data).toHaveProperty("dictionary_name")

        expect(data.dictionary_type).toBe(payload.dictionary_type)
        expect(data.dictionary_name).toBe(payload.dictionary_name)
        expect(typeof data._id).toBe("string")
        expect(typeof data.createdAt).toBe("string")
    });

    test("POST Add Dictionary - Should show failed message when dictionary name already being taken (Negative Case)", async () => {
        const payload = {
            dictionary_name: new_dictionary_name,
            dictionary_type: "inventory_room",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/dictionary").send(payload);

        // Check template respond
        expect(response.status).toBe(409)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("dictionary name has been used. try another")
    });

    test("POST Add Dictionary - Should show failed message when dictionary name to short (Negative Case)", async () => {
        const payload = {
            dictionary_name: "A",
            dictionary_type: "inventory_room",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/dictionary").send(payload);

        // Check template respond
        expect(response.status).toBe(422)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("dictionary name must be at least 2 characters")
    });

    test("POST Add Dictionary - Should show failed message when required field is empty (Negative Case)", async () => {
        const payload = {
            dictionary_type: "inventory_room",
        };
        // Request
        const response = await request(baseURL).post("/api/v2/dictionary").send(payload);

        // Check template respond
        expect(response.status).toBe(422)
        expect(response.body.status).toBe("failed")
        expect(response.body.message).toContain("dictionary name is a required field")
    });
});
