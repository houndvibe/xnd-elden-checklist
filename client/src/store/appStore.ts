import { configureStore } from "@reduxjs/toolkit";

import  collectionSlice  from "./collectionSlice";

const store = configureStore({
  reducer: { collection: collectionSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export default store;
