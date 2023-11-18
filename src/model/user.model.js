import mongoose from "mongoose";
import { Role } from "../service/message.js";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
export default User;
