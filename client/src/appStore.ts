import { configureStore } from "@reduxjs/toolkit";
import shieldsReducer from "./components/categories/shields/slice";

export default configureStore({
  reducer: { shields: shieldsReducer },
});
