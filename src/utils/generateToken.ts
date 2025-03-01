import jwt from "jsonwebtoken";
import { development } from "../environments/development";

export default (id: string) =>
  jwt.sign({ id }, development.jwtKey, {
    expiresIn: "2d",
  });
