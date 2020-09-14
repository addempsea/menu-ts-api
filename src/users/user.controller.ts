import { Request, Response } from "express";
import * as UserService from "./user.service";
import { User, LoginResponse } from "./user.interface";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const createdUser: User = await UserService.create(user);

    res.status(201).json({ msg: "User created", data: createdUser });
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const createdUser: LoginResponse = await UserService.login(user);

    res.status(201).json({ msg: "User logged in", data: createdUser });
  } catch (e) {
    res.status(404).send(e.message);
  }
};

export { loginUser, registerUser };
