import { Axios } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: string;
}

interface UpdateUserInfo {
  username?: string;
  email?: string;
  password?: string;
}

const axiosInstance = new Axios({
  baseURL: "http://localhost:8080/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [updateUserInfo, setUpdateUserInfo] = useState<UpdateUserInfo>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const request = await axiosInstance.get("");
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      setUser(response);
      response.password = "";
      setUpdateUserInfo(response);
    } else {
      toast(response.message);
    }
  }

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.patch(
      "",
      JSON.stringify(updateUserInfo)
    );
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      window.location.reload();
      return;
    } else {
      return toast(response.message);
    }
  }

  async function handleDeleteUser(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.delete("");
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      localStorage.removeItem("auth");
      window.location.reload();
      navigate("/");
      return;
    } else {
      return toast(response.message);
    }
  }

  return {
    user,
    getUser,
    updateUserInfo,
    setUpdateUserInfo,
    handleUpdateUser,
    handleDeleteUser,
  };
}
