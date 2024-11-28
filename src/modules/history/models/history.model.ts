import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema

export enum HistoryType {
  update_image = "Update Image",
  create = "Create",
  create_layout = "Create Layout",
  update_item = "Update item",
  recover_item = "Recover item",
  updated_reminder = "Updated reminder",
  permanently_delete_item = "Permanently delete item",
  unset_to_favorite = "Unset to favorite",
  update_layout = "Update Layout",
  set_to_favorite = "Set to favorite",
  print_item = "Print item",
  delete_item = "Delete item",
  create_reminder = "Create Reminder",
  delete_reminder = "Delete Reminder",
  delete = "Delete",
  delete_storage = "Delete Storage",
  delete_layout = "Delete Layout",
  create_storage = "Create Storage",
  create_report = "Create Report",
  create_item = "Create item",
  permanently_delete = "Permanently delete",
  permanently_delete_reminder = "Permanently delete reminder",
  split_report = "Split Report",
  delete_report = "Delete Report",
  update_report_item = "Update Report Item",
}

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
