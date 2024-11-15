import { createDictionaries } from "../factories/dictionary.factory";

const seedDictionaries = async () => {
    try {
        await createDictionaries(10)
        console.log("Seeded dictionaries successfully.")
    } catch (error) {
        console.error("Failed to seed dictionaries:", error)
    }
};

seedDictionaries()
