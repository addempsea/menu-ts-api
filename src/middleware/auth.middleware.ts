import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helpers.service";
import { findOneUserByUsernameEmail } from "../users/user.service";

export const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = request.headers.authorization?.split(
      " "
    )[1];

    if (!token) {
      return response.status(401).json({ msg: "You have to be logged in" });
    }
    const decoded: string | object = verifyToken(token);
    request.body.token = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ msg: "You have to be logged in" });
  }
};

export const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  const user = await findOneUserByUsernameEmail(username, email);
  if (!user) {
    return next();
  }
  return res.status(409).json({ msg: "username or email registered already" });
};
