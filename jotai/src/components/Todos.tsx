import { Todo, useTodo } from "../hooks/useTodo";
import EditTodo from "./EditTodo";

export default function Todos({ todo }: { todo: Todo }) {
  const { handleUpdateTodo, handleDeleteTodo } = useTodo();

  return (
    <div
      className={`card card-compact w-80 bg-base-100 shadow-xl ${
        todo.checked ? "bg-base-300" : ""
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">{todo.title}</h2>
        <p>{todo.body}</p>
        <div className="card-actions gap-5">
          {!todo.checked && (
            <>
              <div className="mb-10 flex justify-center items-center">
                <button
                  className="btn"
                  onClick={() =>
                    document
                      ?.getElementById(`edit_modal_${todo._id}`)
                      ?.showModal()
                  }
                >
                  Edit
                </button>
                <dialog id={`edit_modal_${todo._id}`} className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div>
                      <h3 className="font-bold text-lg">Edit your todo!</h3>
                      <EditTodo todoId={todo._id} />
                    </div>
                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </div>
                </dialog>
              </div>
              <button
                className="btn btn-outline"
                onClick={() =>
                  document
                    .getElementById(`complete_modal_${todo._id}`)
                    ?.showModal()
                }
              >
                Complete
              </button>
              <dialog id={`complete_modal_${todo._id}`} className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div>
                    <h3 className="font-bold text-lg">
                      Are you sure to mark the todo as complete?
                    </h3>
                    <div className="space-x-5 mt-5">
                      <button
                        onClick={(e) =>
                          handleUpdateTodo(e, todo._id, { checked: true })
                        }
                        className="btn btn-ghost"
                      >
                        Sure
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById(`complete_modal_${todo._id}`)
                            ?.close()
                        }
                        className="btn btn-accent"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <p className="py-4">
                    Press ESC key or click on ✕ button to close
                  </p>
                </div>
              </dialog>
            </>
          )}

          <>
            <button
              className="btn btn-accent"
              onClick={() =>
                document.getElementById(`delete_modal_${todo._id}`)?.showModal()
              }
            >
              Delete
            </button>
            <dialog id={`delete_modal_${todo._id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div>
                  <h3 className="font-bold text-lg">
                    Are you sure to delete the todo?
                  </h3>
                  <div className="space-x-5 mt-5">
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="btn btn-ghost"
                    >
                      Sure
                    </button>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`delete_modal_${todo._id}`)
                          ?.close()
                      }
                      className="btn btn-accent"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p>
              </div>
            </dialog>
          </>
        </div>
      </div>
    </div>
  );
}
