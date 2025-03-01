import { Request, Response } from "express";

export default (req: Request) => {
  try {
    return req.headers["authorization"].split(" ")[1];
  } catch (error) {
    console.error(error);
    return null;
  }
};
