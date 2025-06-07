import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ShieldSubCategoryMap,
  SpiritAshesSubCategoryMap,
} from "../global-types";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { shieldsData } from "../components/categories/shields/data";
import { spiritAshesData } from "../components/categories/spirit-ashes/data";

const initialState = {
  collectionData: loadFromStorage("xnd.collection", {
    shieldsData: shieldsData,
    spiritAshesData: spiritAshesData,
  }),
};

export const collectionSlice = createSlice({
  name: "collection",
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
      const shield = state.collectionData.shieldsData[category].find(
        (s) => s.name === name
      );
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleSpiritAshCollected: (
      state,
      action: PayloadAction<{
        category: keyof SpiritAshesSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const shield = state.collectionData.spiritAshesData[category].find(
        (s) => s.name === name
      );
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
  },
});

export const { toggleShieldCollected, toggleSpiritAshCollected } =
  collectionSlice.actions;
export default collectionSlice.reducer;
