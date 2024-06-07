import { Axios } from "axios";
import { useState, createContext, ReactNode } from "react";
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

const axiosInstance = new Axios({
  baseURL: "http://localhost:8080/api/v1/todos",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface TodoContextType {
  todos: Todo[];
  todo: Todo | undefined;
  getTodos: () => Promise<void>;
  getTodo: (id: string) => Promise<void>;
  createTodo: (createTodoInfo: CreateTodo) => Promise<void>;
  updateTodo: (id: string, updatedTodoInfo: UpdateTodo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>();

  async function getTodos() {
    const request = await axiosInstance.get("");
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      setTodos(response);
    } else {
      toast(response.message);
    }
  }

  async function getTodo(id: string) {
    const request = await axiosInstance.get(id);
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      setTodo(response);
    } else {
      toast(response.message);
    }
  }

  async function createTodo(createTodoInfo: CreateTodo) {
    const request = await axiosInstance.post(
      "",
      JSON.stringify(createTodoInfo)
    );
    const response = await JSON.parse(request.data);

    if (request.status === 201) {
      toast("Todo created!");
      getTodos();
    } else {
      toast(response.message);
    }
  }

  async function updateTodo(id: string, updateData: UpdateTodo) {
    const request = await axiosInstance.patch(
      `/${id}`,
      JSON.stringify(updateData)
    );

    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      getTodos();
    } else {
      toast(response.message);
    }
  }

  async function deleteTodo(id: string) {
    const request = await axiosInstance.delete(id);
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      getTodos();
    } else {
      toast(response.message);
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        getTodos,
        todo,
        getTodo,
        createTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
