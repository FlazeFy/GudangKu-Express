import express from "express";
import db from "./utils/database";
import bodyParser from "body-parser";
import router from "./modules/dictionary/routers/http_handler";

const PORT = 3000;

async function init() {
  try {
    await db();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api/v2", router);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
