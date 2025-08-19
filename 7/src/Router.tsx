import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import { Registration } from "./Registration";
import { Login } from "./Login";
import { ProtectedRoute } from "./Protect";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
