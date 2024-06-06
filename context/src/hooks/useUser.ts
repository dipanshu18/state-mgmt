import { useContext } from "react";
import UserContext from "../context/user";

export function useUser() {
  const userContext = useContext(UserContext);

  if (userContext === undefined) {
    throw new Error("useUser must be declared within a UserProvider");
  }

  return userContext;
}
