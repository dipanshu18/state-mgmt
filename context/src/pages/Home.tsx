import { useEffect } from "react";
import AddTodo from "../components/AddTodo";
import TodoCard from "../components/TodoCard";

import { useTodo } from "../hooks/useTodo";

export default function Home() {
  const { todos, getTodos } = useTodo();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <div className="container p-10">
        <div className="mb-10 flex justify-center items-center">
          <button
            className="btn"
            onClick={() => document?.getElementById("my_modal")?.showModal()}
          >
            Add todo...
          </button>
          <dialog id="my_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <h3 className="font-bold text-lg">Create your todo!</h3>
                <AddTodo />
              </div>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </div>
          </dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  place-items-center gap-10">
          {todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
