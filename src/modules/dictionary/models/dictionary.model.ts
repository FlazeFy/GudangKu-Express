import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema
export interface Dictionary {
  _id?: Types.ObjectId
  dictionary_type: string
  dictionary_name: string
  createdAt: string
  updatedAt: string
}

const dictionarySchema = new Schema<Dictionary>(
  {
    dictionary_type: {
      type: Schema.Types.String,
      required: true,
    },
    dictionary_name: {
      type: Schema.Types.String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const dictionaryModel = mongoose.model("dictionaries", dictionarySchema);

export default dictionaryModel;
