import mongoose from "mongoose";
import { URL_DATABASE } from "./config.js";
const con = mongoose
  .connect(URL_DATABASE)
  .then(() => {
    console.log(`Database Connected!`);
  })
  .catch(() => {
    console.log(`Faild Database Connected!`);
  });
export default con;