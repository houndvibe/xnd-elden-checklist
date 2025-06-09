import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ArmourSubCategoryMap,
  AshesOfWarSubCategoryMap,
  CraftItemsCategoryMap,
  GesturesSubCategoryMap,
  IncantationsSubCategoryMap,
  InfoItemsSubCategoryMap,
  ItemCategory,
  ItemSubCategory,
  MeleWeaponsSubCategoryMap,
  RangedWeaponsSubCategoryMap,
  ShieldAndTorchesSubCategoryMap,
  SorceriesSubCategoryMap,
  SpiritAshesSubCategoryMap,
  TalismansSubCategoryMap,
  TearsOrUpgradesCategoryMap,
  ToolsOrBellBearingsCategoryMap,
  СonsumablesAndMultiplayerItemsCategoryMap,
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
import { consumablesAndMultiplayerData } from "../components/categories/consumables-and-multiplayer/data";

interface Collection {
  shieldsAndTorchesData: ShieldAndTorchesSubCategoryMap;
  spiritAshesData: SpiritAshesSubCategoryMap;
  talismansData: TalismansSubCategoryMap;
  ashesOfWarData: AshesOfWarSubCategoryMap;
  sorceriesData: SorceriesSubCategoryMap;
  incantationsData: IncantationsSubCategoryMap;
  gesturesData: GesturesSubCategoryMap;
  meleWeaponsData: MeleWeaponsSubCategoryMap;
  rangedWeaponsData: RangedWeaponsSubCategoryMap;
  infoItemsData: InfoItemsSubCategoryMap;
  toolsAndBellBearingsData: ToolsOrBellBearingsCategoryMap;
  tearsAndUpgradesData: TearsOrUpgradesCategoryMap;
  craftData: CraftItemsCategoryMap;
  armourData: ArmourSubCategoryMap;
  consumablesAndMultiplayerData: СonsumablesAndMultiplayerItemsCategoryMap;
}

interface State {
  collectionData: Collection;
}

const initialState: State = {
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
    consumablesAndMultiplayerData: consumablesAndMultiplayerData,
  }),
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    toggleItemCollected: (
      state,
      action: PayloadAction<{
        category: ItemCategory;
        subcategory: ItemSubCategory;
        name: string;
      }>
    ) => {
      const { category, subcategory, name } = action.payload;

      const dataKey = (category + "Data") as keyof Collection;
      const categoryData = state.collectionData[dataKey];
      if (!categoryData) return;

      const itemsArray = categoryData[subcategory as keyof typeof categoryData];
      if (!itemsArray || !Array.isArray(itemsArray)) return;

      const item = (itemsArray as { name: string; collected: boolean }[]).find(
        (item) => item.name === name
      );

      if (item) {
        item.collected = !item.collected;
        saveToStorage("xnd.collection", state.collectionData);
      }
    },
    toggleTalismanCollected: (
      state,
      action: PayloadAction<{
        subcategory: keyof TalismansSubCategoryMap;
        name: string;
        tier?: 0 | 1 | 2 | 3;
      }>
    ) => {
      const { subcategory, name, tier } = action.payload;
      const talisman = state.collectionData.talismansData[subcategory].find(
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
        subcategory: keyof ArmourSubCategoryMap;
        name: string;
      }>
    ) => {
      const { subcategory, name } = action.payload;
      const items = state.collectionData.armourData[subcategory];

      // @ts-ignore
      const toggleAndPropagate = (item: any, newValue: boolean): boolean => {
        // Если есть вложенные children — рекурсивно применяем к ним
        if ("children" in item && item.children) {
          const children = Object.values(item.children);
          children.forEach((child) => toggleAndPropagate(child, newValue));
        }

        // Если есть под-элементы внутри items (например, части сета)

        if ("items" in item && Array.isArray(item.items)) {
          // @ts-ignore
          item.items.forEach((sub: any) => toggleAndPropagate(sub, newValue));
        }

        item.collected = newValue;
        return item.collected;
      };

      // @ts-ignore
      const updateParentCollectedStatus = (item: any) => {
        if ("children" in item && item.children) {
          const allCollected = Object.values(item.children).every(
            // @ts-ignore
            (child) => child.collected
          );
          item.collected = allCollected;
        }

        if ("items" in item && Array.isArray(item.items)) {
          // @ts-ignore
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
              // @ts-ignore
              (key) => subItem.children?.[key]?.name === name
            );

            if (matchKey) {
              // @ts-ignore
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
  toggleTalismanCollected,
  toggleArmourItemCollected,
  toggleItemCollected,
} = collectionSlice.actions;
export default collectionSlice.reducer;
