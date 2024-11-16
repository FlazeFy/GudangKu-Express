import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema
export interface History {
  _id?: Types.ObjectId
  history_type: string
  history_context: string
  createdAt: string
}

const historySchema = new Schema<History>(
  {
    history_type: {
      type: Schema.Types.String,
      required: true,
    },
    history_context: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("histories", historySchema)

export default HistoryModel
