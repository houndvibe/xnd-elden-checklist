import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ArmourSubCategoryMap,
  AshesOfWarSubCategoryMap,
  CraftItemsCategoryMap,
  GesturesSubCategoryMap,
  IncantationsSubCategoryMap,
  InfoItemsSubCategoryMap,
  MeleWeaponsSubCategoryMap,
  RangedWeaponsSubCategoryMap,
  ShieldAndTorchesSubCategoryMap,
  SorceriesSubCategoryMap,
  SpiritAshesSubCategoryMap,
  TalismansSubCategoryMap,
  TearsOrUpgradesCategoryMap,
  ToolsOrBellBearingsCategoryMap,
} from "../global-types";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";

import { spiritAshesData } from "../components/categories/spirit-ashes/data";
import { talismansData } from "../components/categories/talismans/data";
import { ashesOfWarData } from "../components/categories/ashes-of-war/data";
import { sorceriesData } from "../components/categories/sorceries/data";
import { incantationsData } from "../components/categories/incantations/data";
import { gesturesData } from "../components/categories/gestures/data";
import { meleWeaponsData } from "../components/categories/mele-weapons/data";
import { rangedWeaponsData } from "../components/categories/ranged-weapons/data";
import { infoItemsData } from "../components/categories/info-items/data";
import { shieldsAndTorchesData } from "../components/categories/shields/data";
import { toolsAndBellBearingsData } from "../components/categories/tools-and-bells/data";
import { tearsAndUpgradesData } from "../components/categories/tears-and-upgrades/data";
import { craftData } from "../components/categories/craft/data";
import { armourData } from "../components/categories/armour/data";

const initialState = {
  collectionData: loadFromStorage("xnd.collection", {
    shieldsAndTorchesData: shieldsAndTorchesData,
    spiritAshesData: spiritAshesData,
    talismansData: talismansData,
    ashesOfWarData: ashesOfWarData,
    sorceriesData: sorceriesData,
    incantationsData: incantationsData,
    gesturesData: gesturesData,
    meleWeaponsData: meleWeaponsData,
    rangedWeaponsData: rangedWeaponsData,
    infoItemsData: infoItemsData,
    toolsAndBellBearingsData: toolsAndBellBearingsData,
    tearsAndUpgradesData: tearsAndUpgradesData,
    craftData: craftData,
    armourData: armourData,
  }),
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    toggleShieldOrTorchCollected: (
      state,
      action: PayloadAction<{
        category: keyof ShieldAndTorchesSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const shield = state.collectionData.shieldsAndTorchesData[category].find(
        (s) => s.name === name
      );
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleMeleWeaponCollected: (
      state,
      action: PayloadAction<{
        category: keyof MeleWeaponsSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const meleWeapon = state.collectionData.meleWeaponsData[category].find(
        (s) => s.name === name
      );
      if (meleWeapon) {
        meleWeapon.collected = !meleWeapon.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleRangedWeaponCollected: (
      state,
      action: PayloadAction<{
        category: keyof RangedWeaponsSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const rangedWeapon = state.collectionData.rangedWeaponsData[
        category
      ].find((s) => s.name === name);
      if (rangedWeapon) {
        rangedWeapon.collected = !rangedWeapon.collected;
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
    toggleGestureCollected: (
      state,
      action: PayloadAction<{
        category: keyof GesturesSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const gesture = state.collectionData.gesturesData[category].find(
        (s) => s.name === name
      );
      if (gesture) {
        gesture.collected = !gesture.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleIncantationCollected: (
      state,
      action: PayloadAction<{
        category: keyof IncantationsSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const incantation = state.collectionData.incantationsData[category].find(
        (s) => s.name === name
      );
      if (incantation) {
        incantation.collected = !incantation.collected;
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

    toggleInfoItemCollected: (
      state,
      action: PayloadAction<{
        category: keyof InfoItemsSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const infoItem = state.collectionData.infoItemsData[category].find(
        (s) => s.name === name
      );
      if (infoItem) {
        infoItem.collected = !infoItem.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleToolOrBellCollected: (
      state,
      action: PayloadAction<{
        category: keyof ToolsOrBellBearingsCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const toolOrBellItem = state.collectionData.toolsAndBellBearingsData[
        category
      ].find((s) => s.name === name);
      if (toolOrBellItem) {
        toolOrBellItem.collected = !toolOrBellItem.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleTearOrUpgradeCollected: (
      state,
      action: PayloadAction<{
        category: keyof TearsOrUpgradesCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const tearOrUpgradeItem = state.collectionData.tearsAndUpgradesData[
        category
      ].find((s) => s.name === name);
      if (tearOrUpgradeItem) {
        tearOrUpgradeItem.collected = !tearOrUpgradeItem.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleCraftItemCollected: (
      state,
      action: PayloadAction<{
        category: keyof CraftItemsCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const craftItem = state.collectionData.craftData[category].find(
        (s) => s.name === name
      );
      if (craftItem) {
        craftItem.collected = !craftItem.collected;
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

    toggleArmourItemCollected: (
      state,
      action: PayloadAction<{
        category: keyof ArmourSubCategoryMap;
        name: string;
      }>
    ) => {
      const { category, name } = action.payload;
      const items = state.collectionData.armourData[category];

      const toggleAndPropagate = (item: any, newValue: boolean): boolean => {
        // Если есть вложенные children — рекурсивно применяем к ним
        if ("children" in item && item.children) {
          const children = Object.values(item.children);
          children.forEach((child) => toggleAndPropagate(child, newValue));
        }

        // Если есть под-элементы внутри items (например, части сета)
        if ("items" in item && Array.isArray(item.items)) {
          item.items.forEach((sub: any) => toggleAndPropagate(sub, newValue));
        }

        item.collected = newValue;
        return item.collected;
      };

      const updateParentCollectedStatus = (item: any) => {
        if ("children" in item && item.children) {
          const allCollected = Object.values(item.children).every(
            (child) => child.collected
          );
          item.collected = allCollected;
        }

        if ("items" in item && Array.isArray(item.items)) {
          const allCollected = item.items.every((i) => i.collected);
          item.collected = allCollected;
        }
      };

      // Поиск на верхнем уровне
      const topItem = items.find((s) => s.name === name);
      if (topItem) {
        const newValue = !topItem.collected;
        toggleAndPropagate(topItem, newValue);
        saveToStorage("xnd.collection", state.collectionData);
        return;
      }

      // Поиск на вложенных уровнях
      for (const item of items) {
        if (!("items" in item)) continue;

        for (const subItem of item.items) {
          if (subItem.name === name) {
            const newValue = !subItem.collected;
            toggleAndPropagate(subItem, newValue);
            updateParentCollectedStatus(item); // Обновляем родителя
            saveToStorage("xnd.collection", state.collectionData);
            return;
          }

          if (subItem.children) {
            const matchKey = Object.keys(subItem.children).find(
              (key) => subItem.children?.[key]?.name === name
            );

            if (matchKey) {
              const match = subItem.children[matchKey];
              const newValue = !match.collected;
              toggleAndPropagate(match, newValue);
              updateParentCollectedStatus(subItem); // Обновляем parent
              updateParentCollectedStatus(item); // Обновляем ещё выше
              saveToStorage("xnd.collection", state.collectionData);
              return;
            }
          }
        }
      }
    },
  },
});

export const {
  toggleShieldOrTorchCollected,
  toggleMeleWeaponCollected,
  toggleRangedWeaponCollected,
  toggleAshOfWarCollected,
  toggleSorceryCollected,
  toggleIncantationCollected,
  toggleSpiritAshCollected,
  toggleTalismanCollected,
  toggleGestureCollected,
  toggleInfoItemCollected,
  toggleToolOrBellCollected,
  toggleTearOrUpgradeCollected,
  toggleCraftItemCollected,
  toggleArmourItemCollected,
} = collectionSlice.actions;
export default collectionSlice.reducer;
