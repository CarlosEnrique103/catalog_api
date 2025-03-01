import { NextFunction, Request, Response } from "express";
import getTokenFromHeader from "../utils/getTokenFromHeader";
import { AppError } from "../utils/appError";
import verifyToken from "../utils/verifyToken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);
  console.log({ token });

  if (!token) {
    return next(new AppError("Bearer token not attached"));
  }
  try {
    const decodedToken = verifyToken(token);

    req.userAuth = decodedToken.id;
    next();
  } catch (error) {
    return next(new AppError("Invalid/expired token", 500));
  }
};
