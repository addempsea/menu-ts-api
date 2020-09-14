import express from "express";
import { checkIfUserExists } from "../middleware/auth.middleware";
import { registerUser, loginUser } from "./user.controller";

export const userRouter = express.Router();

userRouter.post("/register", checkIfUserExists, registerUser);
userRouter.post("/login", loginUser);
