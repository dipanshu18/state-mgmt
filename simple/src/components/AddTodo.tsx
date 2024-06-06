import { useTodo } from "../hooks/useTodo";

export default function AddTodo() {
  const { handleCreateTodo, createTodoInfo, setCreateTodoInfo } = useTodo();

  return (
    <form onSubmit={handleCreateTodo}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="title"
          onChange={(e) =>
            setCreateTodoInfo({ ...createTodoInfo, title: e.target.value })
          }
          value={createTodoInfo.title}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Body</span>
        </label>
        <input
          type="text"
          placeholder="body"
          onChange={(e) =>
            setCreateTodoInfo({ ...createTodoInfo, body: e.target.value })
          }
          value={createTodoInfo.body}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Create</button>
      </div>
    </form>
  );
}
