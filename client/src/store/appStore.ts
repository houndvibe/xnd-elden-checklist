import { configureStore } from "@reduxjs/toolkit";

import collectionSlice from "./collectionSlice";
import discoverySlice from "./discoverySlice";
import settingsSlice from "./settingsSlice";
import serviceSlice from "./serviceSlice";

const store = configureStore({
  reducer: {
    collection: collectionSlice,
    discovery: discoverySlice,
    settings: settingsSlice,
    service: serviceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export default store;
