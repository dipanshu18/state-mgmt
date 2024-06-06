import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userModel } from "../models/userModel";
import { todoModel } from "../models/todoModel";

export async function getUser(req: Request, res: Response) {
  try {
    const { user } = req.body;
    const userExists = await userModel.findById(user._id);

    if (!userExists) {
      return res.status(404).json({ message: "No user found!" });
    }

    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { user, username, email, password } = req.body;
    const userExists = await userModel.findById(user._id);

    if (!userExists) {
      return res.status(404).json({ message: "No user found!" });
    }

    if (!username && !email && !password) {
      return res.status(400).json({ message: "Nothing to update!" });
    }

    const updatedInfo: {
      username?: string;
      email?: string;
      password?: string;
    } = {};

    if (username) updatedInfo["username"] = username;
    if (email) updatedInfo["email"] = email;
    if (password) updatedInfo["password"] = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.updateOne(
      { _id: user._id },
      updatedInfo
    );

    if (updatedUser) {
      return res.status(200).json({ message: "Updated user!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { user } = req.body;
    const userExists = await userModel.findById(user._id);

    if (!userExists) {
      return res.status(404).json({ message: "No user found!" });
    }

    await todoModel.deleteMany({ user: userExists._id });

    await userModel.deleteOne({ _id: userExists._id });

    res.clearCookie("uid");

    return res.status(200).json({ message: "Deleted user!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
