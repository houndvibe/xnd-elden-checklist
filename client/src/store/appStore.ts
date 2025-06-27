import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./collectionSlice";
import settingsReducer from "./settingsSlice";
import serviceReducer from "./serviceSlice";
import checkpointsReducer from "./checkpointsSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    settings: settingsReducer,
    service: serviceReducer,
    checkpoints: checkpointsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export default store;
