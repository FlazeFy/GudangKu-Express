import { createDictionaries } from "../factories/dictionary.factory";

createDictionaries(10).then(() => {
    console.log('Dictionaries seeding complete!');
}).catch(err => {
    console.error('Error seeding dictionaries:', err);
});
