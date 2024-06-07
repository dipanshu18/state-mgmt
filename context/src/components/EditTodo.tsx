import { FormEvent, useEffect, useState } from "react";
import { useTodo } from "../hooks/useTodo";
import { Todo, UpdateTodo } from "../context/todos";

export default function EditTodo({ todoId }: { todoId: string }) {
  const [updateTodoInfo, setUpdateTodoInfo] = useState<UpdateTodo>({
    title: "",
    body: "",
    checked: false,
  });
  const { todos, getTodo, updateTodo } = useTodo();

  useEffect(() => {
    getTodo(todoId);

    const result = todos.find((todo) => todo._id === todoId) as unknown as Todo;
    setUpdateTodoInfo(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTodo]);

  function handleUpdateTodo(e: FormEvent) {
    e.preventDefault();

    updateTodo(todoId, updateTodoInfo);

    document?.getElementById(`edit_modal_${todoId}`)?.close();
  }

  return (
    <form onSubmit={handleUpdateTodo}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          onChange={(e) =>
            setUpdateTodoInfo({ ...updateTodoInfo, title: e.target.value })
          }
          value={updateTodoInfo?.title}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Body</span>
        </label>
        <input
          name="body"
          onChange={(e) =>
            setUpdateTodoInfo({ ...updateTodoInfo, body: e.target.value })
          }
          value={updateTodoInfo?.body}
          className="textarea textarea-bordered"
          required
        />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
}
