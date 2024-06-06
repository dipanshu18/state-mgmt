import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!auth ? <Landing /> : <Navigate to="/home" />} />
      <Route
        path="/signup"
        element={!auth ? <Signup /> : <Navigate to="/home" />}
      />
      <Route
        path="/login"
        element={!auth ? <Login /> : <Navigate to="/home" />}
      />

      <Route
        path="/home"
        element={
          auth ? (
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
          auth ? (
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
