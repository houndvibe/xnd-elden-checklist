import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AshesOfWarSubCategoryMap,
  ShieldSubCategoryMap,
  SorceriesSubCategoryMap,
  SpiritAshesSubCategoryMap,
  TalismansSubCategoryMap,
} from "../global-types";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { shieldsData } from "../components/categories/shields/data";
import { spiritAshesData } from "../components/categories/spirit-ashes/data";
import { talismansData } from "../components/categories/talismans/data";
import { ashesOfWarData } from "../components/categories/ashes-of-war/data";
import { sorceriesData } from "../components/categories/sorceries/data";

const initialState = {
  collectionData: loadFromStorage("xnd.collection", {
    shieldsData: shieldsData,
    spiritAshesData: spiritAshesData,
    talismansData: talismansData,
    ashesOfWarData: ashesOfWarData,
    sorceriesData: sorceriesData,
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
    toggleSorceryCollected: (
      state,
      action: PayloadAction<{
        category: keyof SorceriesSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const sorcery = state.collectionData.sorceriesData[category].find(
        (s) => s.name === name
      );
      if (sorcery) {
        sorcery.collected = !sorcery.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleAshOfWarCollected: (
      state,
      action: PayloadAction<{
        category: keyof AshesOfWarSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const ashOfWar = state.collectionData.ashesOfWarData[category].find(
        (s) => s.name === name
      );
      if (ashOfWar) {
        ashOfWar.collected = !ashOfWar.collected;
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
    toggleTalismanCollected: (
      state,
      action: PayloadAction<{
        category: keyof TalismansSubCategoryMap;
        name: string;
        tier?: 0 | 1 | 2 | 3;
      }>
    ) => {
      const { category, name, tier } = action.payload;
      const talisman = state.collectionData.talismansData[category].find(
        (t) => t.name === name
      );

      if (!talisman) return;

      // Есть версии — переключаем конкретную
      if (talisman.versions && tier !== undefined) {
        const version = talisman.versions.find((v) => v.tier === tier);
        if (version) {
          version.collected = !version.collected;

          // Если после переключения все версии собраны — выставляем collected = true
          talisman.collected = talisman.versions.every((v) => v.collected);
        }
      } else {
        // Нет версий — просто переключаем collected
        talisman.collected = !talisman.collected;
      }

      saveToStorage("xnd.collection", state.collectionData);
    },
  },
});

export const {
  toggleShieldCollected,
  toggleAshOfWarCollected,
  toggleSorceryCollected,
  toggleSpiritAshCollected,
  toggleTalismanCollected,
} = collectionSlice.actions;
export default collectionSlice.reducer;
