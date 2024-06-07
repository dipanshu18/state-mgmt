import { Axios } from "axios";
import { ReactNode, useState, createContext } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: string;
}

export interface UpdateUserInfo {
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

interface UserContextType {
  user: User | undefined;
  getUser: () => Promise<void>;
  updateUser: (updatedInfo: UpdateUserInfo) => Promise<void>;
  deleteUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();

  async function getUser() {
    const request = await axiosInstance.get("");
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      response.password = "";
      setUser(response);
    } else {
      toast(response.message);
    }
  }

  async function updateUser(updatedInfo: UpdateUserInfo) {
    const request = await axiosInstance.patch("", JSON.stringify(updatedInfo));
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      toast(response.message);
    } else {
      toast(response.message);
    }
  }

  async function deleteUser() {
    const request = await axiosInstance.delete("");
    const response = await JSON.parse(request.data);

    if (request.status === 200) {
      localStorage.removeItem("auth");
      toast(response.message);
      window.location.reload();
    } else {
      toast(response.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, getUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
