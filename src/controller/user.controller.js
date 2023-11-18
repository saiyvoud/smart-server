import { EnCryptData, DeCryptData } from "../service/promise.js";
import { ValidateData } from "../service/validate.js";
import Models from "../model/index.js";
import { jwts } from "../service/promise.js";
import {
  SendCreate,
  SendError403,
  SendSuccess,
  SendError400,
  SendError500,
  SendError404,
} from "../service/response.js";
import mongoose from "mongoose";
export default class UserController {
  static async getProfile(req, res) {
    try {
      const user_id = req.user;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, "Not Found User");
      }
      const user = await Models.User.findById(user_id).select("-password");
      return SendSuccess(res, "Get Profile Success", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "ServerFaild", error);
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const validate = ValidateData({ username, password });
      if (validate.length > 0) {
        return SendError400(res, "Please input:" + validate.join(","));
      }

      const check = await Models.User.findOne({ username });
      if (!check) {
        return SendError404(res, "Not Found" + "username", check);
      }
      const decrypt = await DeCryptData(check.password);
      // compare password
      if (password === decrypt) {
        const encriptID = await EnCryptData(JSON.stringify(check._id));
        // encrip type
        const encriptType = await EnCryptData(JSON.stringify("USER_TYPE"));
        const data = {
          id: encriptID,
          type: encriptType,
        };
        const result = await jwts(data);
        const newData = Object.assign(
          JSON.parse(JSON.stringify(check)),
          JSON.parse(JSON.stringify(result))
        );
        return SendSuccess(res, "Login Success", newData);
      }
      return SendError400(res, "Password is not Match");
    } catch (error) {
      console.log(error);
      return SendError500(res, "ServerFaild", error);
    }
  }

  static async register(req, res) {
    try {
      const { username, password } = req.body;
      const validate = ValidateData({ username, password });
      if (validate.length > 0) {
        return SendError400(res, "please input: " + validate.join(","));
      }

      const encrypt = await EnCryptData(password);
      if (!encrypt) {
        return SendError403(res, "Error encrypt");
      }
      const checkUsername = await Models.User.findOne({ username });
      if (checkUsername) {
        return SendError403(res, "Username Already!");
      }
      const user = await Models.User.create({ username, password: encrypt });
      const encriptID = await EnCryptData(JSON.stringify(user._id));
      // encrip type
      const encriptType = await EnCryptData(JSON.stringify("USER_TYPE"));
      const userData = await Models.User.findById(user._id).select("-password");
      const data = {
        id: encriptID,
        type: encriptType,
      };
      const result = await jwts(data);
      const newData = Object.assign(
        JSON.parse(JSON.stringify(userData)),
        JSON.parse(JSON.stringify(result))
      );
      return SendCreate(res, "Register Success", newData);
    } catch (error) {
      console.log(error);
      return SendError500(res, "serverFaild", error);
    }
  }
}
