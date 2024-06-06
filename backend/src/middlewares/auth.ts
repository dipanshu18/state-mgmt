import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET as string;

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { uid } = req.cookies;

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const decoded = jwt.verify(uid, SECRET) as JwtPayload;

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  req.body.user = { ...decoded };
  next();
}
