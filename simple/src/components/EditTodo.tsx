import { useEffect } from "react";
import { useTodo } from "../hooks/useTodo";

export default function EditTodo({ todoId }: { todoId: string }) {
  const { updateTodoInfo, setUpdateTodoInfo, handleUpdateTodo, getTodo } =
    useTodo();

  useEffect(() => {
    getTodo(todoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={(e) => handleUpdateTodo(e, todoId, updateTodoInfo)}>
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
          value={updateTodoInfo.title}
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
          value={updateTodoInfo.body}
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
