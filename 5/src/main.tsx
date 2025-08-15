import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import { Router } from "./Router.tsx";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </Provider>
  </StrictMode>
);
