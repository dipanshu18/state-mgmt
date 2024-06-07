import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UpdateUserInfo } from "../context/user";

import UpdateUser from "../components/UpdateUser";
import DeleteUser from "../components/DeleteUser";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const navigate = useNavigate();

  const [updateUserInfo, setUpdateUserInfo] = useState<UpdateUserInfo>({
    username: "",
    email: "",
    password: "",
  });

  const { user } = useUser();

  useEffect(() => {
    user && setUpdateUserInfo(user);
  }, [user]);

  return (
    <div className="container p-5 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-medium my-5">Your Profile</h1>
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUpdateUserInfo({
                  ...updateUserInfo,
                  username: e.target.value,
                });
              }}
              value={updateUserInfo?.username}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => {
                setUpdateUserInfo({ ...updateUserInfo, email: e.target.value });
              }}
              value={updateUserInfo?.email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setUpdateUserInfo({
                  ...updateUserInfo,
                  password: e.target.value,
                });
              }}
              value={updateUserInfo?.password}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6 flex-row space-x-5">
            <UpdateUser updatedInfo={updateUserInfo} />
            <DeleteUser />
            <button
              onClick={() => navigate("/home")}
              className="btn btn-outline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
