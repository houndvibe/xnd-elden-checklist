import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { shieldsData } from "./data";
import type { ShieldSubCategoryMap } from "../../../global-types";
import { loadFromStorage, saveToStorage } from "../../../lib/utils/localStore";
import { STORAGE_KEYS } from "../../../lib/consts";

const initialState = {
  shieldsData: loadFromStorage(STORAGE_KEYS.shields, shieldsData),
};

export const shieldsSlice = createSlice({
  name: "shields",
  initialState,
  reducers: {
    toggleShieldCollected: (
      state,
      action: PayloadAction<{
        category: keyof ShieldSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const shield = state.shieldsData[category].find((s) => s.name === name);
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage(STORAGE_KEYS.shields, state.shieldsData);
      }
    },
  },
});

export const { toggleShieldCollected } = shieldsSlice.actions;
export default shieldsSlice.reducer;
