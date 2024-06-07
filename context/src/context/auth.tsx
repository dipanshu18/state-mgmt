import { Axios } from "axios";
import { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";

export interface SignupData {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginData {
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

export interface AuthContextType {
  auth: string | null;
  signup: (signupData: SignupData) => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<string | null>(localStorage.getItem("auth"));

  async function signup(signupData: SignupData) {
    const request = await axiosInstance.post(
      "signup",
      JSON.stringify(signupData)
    );

    const response = await JSON.parse(request.data);
    if (request.status === 201) {
      toast(response.message);
      localStorage.setItem("auth", JSON.stringify("true"));
      setAuth(localStorage.getItem("auth"));
    } else {
      toast(response.message);
    }
  }

  async function login(loginData: LoginData) {
    const request = await axiosInstance.post(
      "login",
      JSON.stringify(loginData)
    );

    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      localStorage.setItem("auth", JSON.stringify("true"));
      setAuth(localStorage.getItem("auth"));
    } else {
      toast(response.message);
    }
  }

  async function logout() {
    const request = await axiosInstance.post("logout");

    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
      localStorage.removeItem("auth");
      setAuth(null);
    } else {
      toast(response.message);
    }
  }

  return (
    <AuthContext.Provider value={{ auth, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
