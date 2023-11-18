import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);
export default Product;
