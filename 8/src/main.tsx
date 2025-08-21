import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { Router } from "./Router.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
        <Router />
    </Provider>
  </StrictMode>
);
