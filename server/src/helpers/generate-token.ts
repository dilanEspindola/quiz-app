import * as jwt from "jsonwebtoken";

interface Payload {
  id: number;
  username: string;
  email: string;
}

interface JwtExtended extends jwt.JwtPayload {
  id: number;
  username: string;
  email: string;
}

export const createToken = (payload: Payload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = (token: string): JwtExtended => {
  const verify = jwt.verify(token, process.env.JWT_SECRET) as JwtExtended;
  return verify;
};
