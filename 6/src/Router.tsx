import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import { TestApi } from "./TestApi";
import { Registration } from "./Registration";
import { Login } from "./Login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test-api" element={<TestApi />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
