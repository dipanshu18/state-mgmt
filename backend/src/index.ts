import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { todoRouter } from "./routes/todo";
import { verifyUser } from "./middlewares/auth";

dotenv.config();

const PORT = process.env.PORT as string;
const MONGO_URI = process.env.MONGO_URI as string;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", verifyUser, userRouter);
app.use("/api/v1/todos", verifyUser, todoRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected...");
    app.listen(PORT, function () {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
