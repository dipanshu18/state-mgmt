import { useUser } from "../hooks/useUser";

export default function DeleteUser() {
  const { user, handleDeleteUser } = useUser();

  return (
    <div>
      <button
        className="btn btn-ghost"
        onClick={() =>
          document.getElementById(`delete_modal_${user?._id}`)?.showModal()
        }
      >
        Delete Profile
      </button>
      <dialog id={`delete_modal_${user?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h3 className="font-bold text-lg">
              Are you sure you want to delete your profile?
            </h3>
            <p>
              <span className="font-extrabold">NOTE:</span>Your all todos will
              also get deleted!
            </p>
            <div className="space-x-5 mt-5">
              <button onClick={handleDeleteUser} className="btn btn-ghost">
                Sure
              </button>

              <button
                onClick={() =>
                  document.getElementById(`delete_modal_${user?._id}`)?.close()
                }
                className="btn btn-accent"
              >
                Cancel
              </button>
            </div>
          </div>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
}
