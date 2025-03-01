import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import Product from "../models/product.model";
import {
  checkImage,
  convertToBase64Image,
  getUrlFromCloudinary,
} from "../utils/imageFunctions";

export const productRegisterCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, price } = req.body;

  try {
    const productFound = await Product.findOne({ name });

    if (productFound) {
      next(new AppError("Product already use."));
    }

    if (!req.file) return next(new AppError("Please upload an image"));

    const { status, message } = checkImage(req.file);

    if (!status) {
      next(new AppError(message, 403));
    }

    const base64Image = convertToBase64Image(req.file);

    const imageURl = await getUrlFromCloudinary(base64Image);

    const product = await Product.create({
      name,
      description,
      imageURl,
      price,
    });

    res.json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const productListCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.find();
  try {
    res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};
