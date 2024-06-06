import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo";

const todoRouter = express.Router();

todoRouter.get("/", getTodos);

todoRouter.get("/:id", getTodo);

todoRouter.post("/", createTodo);

todoRouter.patch("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);

export { todoRouter };
