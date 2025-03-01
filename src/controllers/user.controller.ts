import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const userRegisterCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      next(new AppError("User already use."));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const userLoginCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      next(new AppError("Wrong login credentials"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      next(new AppError("Wrong login credentials"));
    }

    const { id, firstName, lastName, isAdmin } = userFound;

    res.json({
      status: "success",
      data: {
        id,
        firstName,
        lastName,
        email: userFound.email,
        isAdmin,
        token: generateToken(userFound.id),
      },
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const userProfileCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userAuth);

    if (!user) {
      next(new AppError("User not found", 401));
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const userListCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      status: "success",
      data: "List route",
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const userDeleteCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      status: "success",
      data: "Delete user",
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const userUpdateCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({
      status: "success",
      data: "Update user",
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};
