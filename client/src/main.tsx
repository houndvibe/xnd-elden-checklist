import App from "./App.tsx";
import store from "./store/appStore.ts";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { initGA, trackPage } from "./lib/ga";

initGA();
trackPage(window.location.pathname);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
