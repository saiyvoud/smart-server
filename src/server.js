import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./config/config.js";
import "./config/db.js"
import router from "./router/index.js";
import fileUpload from "express-fileupload";
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(
  bodyParser.urlencoded({ extended: true, parameterLimit: 500, limit: "500mb" }),
);
app.use(fileUpload());

app.use("/api",router);
app.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
