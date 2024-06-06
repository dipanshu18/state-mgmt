import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.patch("/", updateUser);

userRouter.delete("/", deleteUser);

export { userRouter };
