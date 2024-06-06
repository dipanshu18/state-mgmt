import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  const authenticated = localStorage.getItem("auth");

  return (
    <Routes>
      <Route
        path="/"
        element={!authenticated ? <Landing /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!authenticated ? <Signup /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!authenticated ? <Login /> : <Navigate to="/home" />}
      />

      <Route
        path="/home"
        element={
          authenticated ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          authenticated ? (
            <>
              <Navbar />
              <Profile />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
