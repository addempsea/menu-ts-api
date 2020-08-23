import { User, LoginResponse } from "./user.interface";
import {
  generateId,
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/helpers.service";
import { db } from "../db/db-config";
import {
  createUser,
  findOneUser,
  findUserByUsernameEmail,
} from "../db/queries";

export const create = async (newUser: User): Promise<User> => {
  const { username, email, password } = newUser;
  const id: string = generateId();
  const hash: string = hashPassword(password);
  const user: User = await db.one(createUser, [id, username, hash, email]);
  return user;
};

export const findOneUserByUsername = async (
  username: string
): Promise<User> => {
  const user: User | null = await db.oneOrNone(findOneUser, [username]);
  if (user) {
    return user;
  }

  throw new Error("No user found");
};

export const login = async (userLoginDetails: User): Promise<LoginResponse> => {
  const { username, email } = userLoginDetails;
  const { password, id } = await findOneUserByUsername(username);
  const match: boolean = comparePassword(userLoginDetails.password, password);
  if (match) {
    const token = generateToken({ id, password });
    const response: LoginResponse = {
      id,
      token,
      email,
      username
    };
    return response;
  }

  throw new Error("Invalid login details");
};

export const findOneUserByUsernameEmail = async (
  username: string,
  email: string
): Promise<User | null> => {
  const user: User | null = await db.oneOrNone(findUserByUsernameEmail, [
    username,
    email
  ]);
  return user;
};
