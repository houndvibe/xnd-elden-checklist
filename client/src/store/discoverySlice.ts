import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_DISCOVERY } from "../lib/consts";

interface DiscoveryState {
  calculatedDiscovery: number;
}

const initialState: DiscoveryState = {
  calculatedDiscovery: BASE_DISCOVERY,
};

export const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    setCalculatedDiscovery: (state, action: PayloadAction<number>) => {
      state.calculatedDiscovery = action.payload;
    },
  },
});

export const { setCalculatedDiscovery } = discoverySlice.actions;
export default discoverySlice.reducer;
