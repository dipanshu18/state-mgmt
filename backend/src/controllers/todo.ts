import { Request, Response } from "express";
import { todoModel } from "../models/todoModel";

export async function getTodos(req: Request, res: Response) {
  try {
    const { user } = req.body;

    const todos = await todoModel.find({ user: user._id });

    if (todos.length < 1) {
      return res.status(404).json({ message: "No todos found!" });
    }

    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function getTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const todo = await todoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "No todo found!" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const { user, title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const todoExists = await todoModel.findOne({ user: user._id, title });

    if (todoExists) {
      return res
        .status(400)
        .json({ message: "Todo already exists with that title!" });
    }

    const newTodo = await todoModel.create({
      title,
      body,
      user: user._id,
    });

    if (newTodo) {
      await newTodo.save();
      return res.status(201).json(newTodo);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, body, checked } = req.body;
    const todoExists = await todoModel.findById(id);

    if (!todoExists) {
      return res.status(400).json({ message: "Todo doesn't exists!" });
    }

    if (title === undefined && body === undefined && checked === undefined) {
      return res.status(400).json({ message: "Nothing to update!" });
    }

    const updatedInfo: {
      title?: string;
      body?: string;
      checked?: boolean;
    } = {};

    if (title) updatedInfo["title"] = title;
    if (body) updatedInfo["body"] = body;
    if (checked) updatedInfo["checked"] = checked;

    const updatedTodo = await todoModel.updateOne({ _id: id }, updatedInfo);

    if (updatedTodo) {
      return res.status(200).json({ message: "Updated todo!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todoExists = await todoModel.findById(id);

    if (!todoExists) {
      return res.status(400).json({ message: "Todo doesn't exists!" });
    }

    await todoModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted todo!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}
