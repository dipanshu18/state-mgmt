import { Axios } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignupData {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginData {
  username?: string;
  password?: string;
}

const axiosInstance = new Axios({
  baseURL: "http://localhost:8080/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useAuth() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.post(
      "signup",
      JSON.stringify(signupData)
    );

    const response = await JSON.parse(request.data);
    if (request.status === 201) {
      toast(response.message);
      localStorage.setItem("auth", JSON.stringify("true"));
      window.location.reload();
    } else {
      toast(response.message);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.post(
      "login",
      JSON.stringify(loginData)
    );

    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      localStorage.setItem("auth", JSON.stringify("true"));
      window.location.reload();
    } else {
      toast(response.message);
    }
  }

  async function handleLogout(e: FormEvent) {
    e.preventDefault();

    const request = await axiosInstance.post("logout");

    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      localStorage.removeItem("auth");
      window.location.reload();
      navigate("/");
    } else {
      toast(response.message);
    }
  }

  return {
    signupData,
    setSignupData,
    handleSignup,
    loginData,
    setLoginData,
    handleLogin,
    handleLogout,
  };
}
