import mongoose from "mongoose";
import UploadImage from "../config/cloudinary.js";
import Models from "../model/index.js";
import {
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateData } from "../service/validate.js";

export default class ProductController {
  static async getAll(req, res) {
    try {
      const products = await Models.Product.find();
      return SendSuccess(res, "Get All Success", products);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }

  static async insert(req, res) {
    try {
      const { name, detail, price } = req.body;

      const validate = ValidateData({ name, detail, price });
      if (validate.length > 0) {
        return SendError400(res, "Please Input:", validate);
      }

      const image = req.files.image;

      if (image === undefined) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(image.data, image.name);
      const product = await Models.Product.create({
        name,
        detail,
        price,
        image: image_url,
      });
      return SendSuccess(res, "Insert Success", product);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Server Faild", error);
    }
  }
  static async updateProduct(req, res) {
    try {
      const product_id = req.params.product_id;
      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return SendError404(res, "Not Found Product");
      }
      const { name, detail, price } = req.body;
      if (!mongoose.Types.ObjectId.isValid) {
        return SendError404(res, "Not Found Category");
      }
      const validate = ValidateData({ name, detail, price });
      if (validate.length > 0) {
        return SendError400(res, "Please Input:", validate);
      }
      const product = await Models.Product.findByIdAndUpdate(
        {
          name,
          detail,
          price,
        },
        { new: true }
      );
      return SendSuccess(res, "Update Success", product);
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
