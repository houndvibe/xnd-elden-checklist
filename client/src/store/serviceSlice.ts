import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  globalSearchItem: string | null;
  globalSearchSet: string | null;
}

const initialState: ServiceState = {
  globalSearchItem: null,
  globalSearchSet: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setGlobalSearchItem: (state, action: PayloadAction<string | null>) => {
      state.globalSearchItem = action.payload;
    },
    setGlobalSearchSet: (state, action: PayloadAction<string | null>) => {
      state.globalSearchSet = action.payload;
    },
  },
});

export const { setGlobalSearchItem, setGlobalSearchSet } = serviceSlice.actions;
export default serviceSlice.reducer;
