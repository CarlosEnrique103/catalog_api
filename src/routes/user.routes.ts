import express from "express";
import {
  userDeleteCtrl,
  userLoginCtrl,
  userProfileCtrl,
  userRegisterCtrl,
  userUpdateCtrl,
} from "./../controllers/user.controller";
import isLogin from "../middlewares/isLogin";

const userRouter = express.Router();

// POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

// POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

// GET /api/v1/users/profile/:id
userRouter.get("/profile", isLogin, userProfileCtrl);

// DELETE /api/v1/users/:id
userRouter.delete("/:id", userDeleteCtrl);

// PUT /api/v1/users/:id
userRouter.put("/:id", userUpdateCtrl);

export default userRouter;
