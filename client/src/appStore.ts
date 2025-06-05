import { configureStore } from "@reduxjs/toolkit";
import shieldsReducer from "./components/categories/shields/slice";

const store = configureStore({
  reducer: { shields: shieldsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export default store;
