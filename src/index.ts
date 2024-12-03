import express from "express";
import db from "./utils/database";
import bodyParser from "body-parser";
import router_dictionary from "./modules/dictionary/routers/http_handler";
import router_history from "./modules/history/routers/http_handler";
import router_inventory from "./modules/inventory/routers/http_handler";
import router_reminder from "./modules/reminder/routers/http_handler";
import router_user from "./modules/user/routers/http_handler";
import multer from "multer";
import { swaggerUi, specs } from './docs/swagger'
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

const PORT = 3000
const upload = multer()

async function init() {
  try {
    await db()

    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(upload.any())
    
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {
        customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: CSS_URL,
      })
    )
    
    app.use("/api/v2", [router_dictionary,router_history,router_inventory,router_reminder,router_user])

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    });
  } catch (error) {
    console.log(error)
  }
}

init();
