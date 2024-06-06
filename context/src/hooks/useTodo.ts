import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Todo {
  _id: string;
  title: string;
  body: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodo {
  title: string;
  body: string;
}

export interface UpdateTodo {
  title?: string;
  body?: string;
  checked?: boolean;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [createTodoInfo, setCreateTodoInfo] = useState<CreateTodo>({
    title: "",
    body: "",
  });
  const [updateTodoInfo, setUpdateTodoInfo] = useState<UpdateTodo>({
    title: "",
    body: "",
    checked: false,
  });

  async function getTodos() {
    const request = await axiosInstance.get("");
    if (request.status === 200) {
      setTodos(request.data);
    } else {
      toast(request.data.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodo(id: string) {
    const request = await axiosInstance.get(id);
    if (request.status === 200) {
      setUpdateTodoInfo(request.data);
    } else {
      toast(request.data.message);
    }
  }

  async function handleCreateTodo(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.post("", createTodoInfo);
    if (request.status === 201) {
      toast("Todo created!");
      setCreateTodoInfo({ title: "", body: "" });
      document.getElementById("my_modal")?.close();
      getTodos();
    } else {
      toast(request.data.message);
    }
  }

  async function handleUpdateTodo(
    e: FormEvent,
    id: string,
    updateData: UpdateTodo
  ) {
    e.preventDefault();

    const request = await axiosInstance.patch(`/${id}`, updateData);
    if (request.status === 200) {
      toast(request.data.message);
      document.getElementById(`edit_modal_${id}`)?.close();
      document.getElementById(`complete_modal_${id}`)?.close();
      getTodos();
    } else {
      toast(request.data.message);
    }
  }

  async function handleDeleteTodo(id: string) {
    const request = await axiosInstance.delete(id);
    if (request.status === 200) {
      toast(request.data.message);
      document.getElementById(`delete_modal_${id}`)?.close();
      getTodos();
    } else {
      toast(request.data.message);
    }
  }

  return {
    todos,
    createTodoInfo,
    setCreateTodoInfo,
    updateTodoInfo,
    setUpdateTodoInfo,
    getTodos,
    getTodo,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
}
