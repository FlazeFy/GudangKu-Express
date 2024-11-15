import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "gudangku-stage",
    });
    console.log("Database connected")
  } catch (error) {
    console.log(error)
  }
};

export default connect;
