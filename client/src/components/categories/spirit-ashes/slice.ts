import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../../lib/consts";
import { spiritAshesData } from "./data";
import type { SpiritAshesSubCategoryMap } from "../../../global-types";
import { loadFromStorage, saveToStorage } from "../../../lib/utils/localStore";

const initialState = {
  spiritAshesData: loadFromStorage(STORAGE_KEYS.spiritAshes, spiritAshesData),
};

export const spiritAshesSlice = createSlice({
  name: "spiritAshes",
  initialState,
  reducers: {
    toggleSpiritAshesCollected: (
      state,
      action: PayloadAction<{
        category: keyof SpiritAshesSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const spiritAsh = state.spiritAshesData[category].find(
        (s) => s.name === name
      );
      if (spiritAsh) {
        spiritAsh.collected = !spiritAsh.collected;
        saveToStorage(STORAGE_KEYS.spiritAshes, state.spiritAshesData);
      }
    },
  },
});

export const { toggleSpiritAshesCollected } = spiritAshesSlice.actions;
export default spiritAshesSlice.reducer;
