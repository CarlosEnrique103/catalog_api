import express from "express";

import isLogin from "../middlewares/isLogin";
import {
  productListCtrl,
  productRegisterCtrl,
} from "../controllers/product.controller";
import { upload } from "../middlewares/multer";

const productRouter = express.Router();

// GET /api/v1/products
productRouter.get("/", productListCtrl);

// POST /api/v1/products
productRouter.post(
  "/create",
  isLogin,
  upload.single("image"),
  productRegisterCtrl
);

export default productRouter;
