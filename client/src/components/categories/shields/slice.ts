import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { shieldsData, type Shields } from "./data";

export interface ThemeSliceState {
  shieldsData: Shields;
}
const initialState: ThemeSliceState = {
  shieldsData: shieldsData,
};

export const shieldsSlice = createSlice({
  name: "shields",
  initialState,
  reducers: {
    changeShieldStatus: (state, action: PayloadAction<Shields>) => {
      state.shieldsData = action.payload;
    },
  },
});

export const { changeShieldStatus } = shieldsSlice.actions;

export default shieldsSlice.reducer;
