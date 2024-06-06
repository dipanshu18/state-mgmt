import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";

import { AuthProvider } from "./context/auth";
import { UserProvider } from "./context/user.tsx";
import { TodoProvider } from "./context/todos.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <TodoProvider>
            <Toaster position="top-right" />
            <App />
          </TodoProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
