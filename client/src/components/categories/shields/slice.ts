import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { shieldsData, type Shields } from "./data";
import { loadFromStorage, saveToStorage } from "../../../lib";

const STORAGE_KEY = "xnd.eldenring.shields";

const initialState = {
  shieldsData: loadFromStorage(STORAGE_KEY, shieldsData),
};

export const shieldsSlice = createSlice({
  name: "shields",
  initialState,
  reducers: {
    toggleShieldCollected: (
      state,
      action: PayloadAction<{ category: keyof Shields; name: string }>
    ) => {
      const { category, name } = action.payload;
      const shield = state.shieldsData[category].find((s) => s.name === name);
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage(STORAGE_KEY, state.shieldsData);
      }
    },
  },
});

export const { toggleShieldCollected } = shieldsSlice.actions;
export default shieldsSlice.reducer;
