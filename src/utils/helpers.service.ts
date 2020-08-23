import "dotenv/config";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import * as jwt from "jsonwebtoken";

const SECRET: string = String(process.env.SECRET as string)

export const generateId = () => {
  return uuidV4();
};

export const generateToken = (payload: object, expiresIn = "2h") => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const hashPassword = (myPlaintextPassword: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  return hash;
};

export const comparePassword = (
  myPlaintextPassword: string,
  hash: string
) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
};
