import { useContext } from "react";
import AuthContext from "../context/auth";

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useAuth must be declared within a AuthProvider");
  }

  return authContext;
}
