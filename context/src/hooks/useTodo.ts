import { useContext } from "react";
import TodoContext from "../context/todos";

export function useTodo() {
  const todoContext = useContext(TodoContext);

  if (todoContext === undefined) {
    throw new Error("todoContext must be declared within a TodoProvider");
  }

  return todoContext;
}
