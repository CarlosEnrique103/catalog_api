import { development } from "../environments/development";
import jwt, { JwtPayload } from "jsonwebtoken";

export default (token: string) => {
  const decoded: JwtPayload = jwt.verify(
    token,
    development.jwtKey
  ) as JwtPayload;
  return decoded;
};
