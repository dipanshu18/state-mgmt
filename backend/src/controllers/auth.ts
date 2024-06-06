import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/userModel";

dotenv.config();

const SECRET = process.env.SECRET as string;

export async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields!" });
  }

  try {
    const userExists = await userModel.findOne({ username, email });

    if (userExists && userExists.email === email) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashPass,
    });

    if (newUser) {
      const { _id, username, email } = newUser;
      const token = jwt.sign({ _id, username, email }, SECRET);
      res.cookie("uid", token, { httpOnly: true, sameSite: "lax" });
      return res.status(201).json({
        message: "Account created!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Something went wrong while creating user with provided credentials!",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const userExists = await userModel.findOne({ username });

    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exists!" });
    }

    const verifyPass = await bcrypt.compare(password, userExists.password);

    if (!verifyPass) {
      return res
        .status(400)
        .json({ message: "Entered password is incorrect!" });
    } else {
      const { _id, email, username } = userExists;
      const token = jwt.sign({ _id, email, username }, SECRET);
      res.cookie("uid", token, { httpOnly: true, sameSite: "lax" });
      return res.status(200).json({
        message: "Credentials verified!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("uid");
    return res.status(200).json({ message: "Logging out!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
