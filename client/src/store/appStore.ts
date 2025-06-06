import { configureStore } from "@reduxjs/toolkit";
import shieldsReducer from "../components/categories/shields/slice";
import spiritAshesReducer from "../components/categories/spirit-ashes/slice";

const store = configureStore({
  reducer: { shields: shieldsReducer, spiritAshes: spiritAshesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export default store;
