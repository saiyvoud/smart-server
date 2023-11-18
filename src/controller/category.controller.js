import mongoose from "mongoose";
import Models from "../model/index.js";
import {
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateData } from "../service/validate.js";

export default class CategoryController {
  static async getAll(req, res) {
    try {
      const category = await Models.Category.find();
      return SendSuccess(res, "Get All Success", category);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }

  static async insert(req, res) {
    try {
      const { name } = req.body;
      if (!mongoose.Types.ObjectId.isValid) {
        return SendError404(res, "Not Found Category");
      }
      const validate = ValidateData({ name });
      if (validate.length > 0) {
        return SendError400(res, "Please Input:", validate);
      }
      const category = await Models.Category.create({
        name,
      });
      return SendSuccess(res, "Insert Success", category);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }
  static async updateCategory(req, res) {
    try {
      const category_id = req.params.category_id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, "Not Found Product");
      }
      const { name } = req.body;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, "Not Found Category");
      }
      const validate = ValidateData({ name });
      if (validate.length > 0) {
        return SendError400(res, "Please Input:", validate);
      }
      const category = await Models.Category.findByIdAndUpdate(
        {
          name,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Success", category);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      const product_id = req.params.product_id;
      if (!mongoose.Types.ObjectId.isValid) {
        return SendError404(res, "Not Found Product");
      }

      const product = await Models.Product.findByIdAndDelete(product_id, {
        new: true,
      });
      return SendSuccess(res, "Delete Success", product);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }
}
