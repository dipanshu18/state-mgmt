import { useUser } from "../hooks/useUser";

export default function UpdateUser() {
  const { user, handleUpdateUser } = useUser();

  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          document.getElementById(`update_modal_${user?._id}`)?.showModal()
        }
      >
        Update Profile
      </button>
      <dialog id={`update_modal_${user?._id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h3 className="font-bold text-lg">
              Are you sure you want to update your profile?
            </h3>
            <div className="space-x-5 mt-5">
              <button
                onClick={() => handleUpdateUser}
                className="btn btn-ghost"
              >
                Sure
              </button>

              <button
                onClick={() =>
                  document.getElementById(`update_modal_${user?._id}`)?.close()
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
