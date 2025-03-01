import mongoose, { Schema, Model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    imageURl: {
      type: String,
      required: [true, "ImageURl is required."],
    },
    price: {
      type: String,
      required: [true, "Price is required."],
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
