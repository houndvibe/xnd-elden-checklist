import App from "./App.tsx";
import store from "./store/appStore.ts";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
