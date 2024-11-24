import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema

export enum DictionaryType {
  inventory_category = "inventory_category",
  inventory_unit = "inventory_unit",
  inventory_room = "inventory_room",
  reminder_type = "reminder_type",
  reminder_context = "reminder_context",
  report_category = "report_category",
}

export interface Dictionary {
  _id?: Types.ObjectId
  dictionary_type: string
  dictionary_name: string
  createdAt?: string
  updatedAt?: string
}

const dictionarySchema = new Schema<Dictionary>(
  {
    dictionary_type: {
      type: String,
      enum: Object.values(DictionaryType),
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
