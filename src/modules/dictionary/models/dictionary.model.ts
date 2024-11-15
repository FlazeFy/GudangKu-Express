import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dictionarySchema = new Schema(
  {
    dictionary_type: {
      type: String,
      required: true,
    },
    dictionary_name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const dictionaryModel = mongoose.model("dictionary", dictionarySchema);

export default dictionaryModel;
