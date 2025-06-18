import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  globalSearchItem: string | null;
}

const initialState: ServiceState = {
  globalSearchItem: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setGlobalSearchItem: (state, action: PayloadAction<string | null>) => {
      state.globalSearchItem = action.payload;
    },
  },
});

export const { setGlobalSearchItem } = serviceSlice.actions;
export default serviceSlice.reducer;
