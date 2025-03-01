import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import Product from "../models/product.model";
import {
  checkImage,
  convertToBase64Image,
  getUrlFromCloudinary,
} from "../utils/imageFunctions";
import { generatePDF } from "../utils/generatePDF";

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
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Error loading products",
      error: error.message,
    });
  }
};

export const productGeneratePDFCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      next(new AppError("Id its necessary."));
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      next(new AppError("Product not found ."));
    }

    await generatePDF(product, res);
  } catch (error) {
    next(new AppError(error.message));
  }
};
