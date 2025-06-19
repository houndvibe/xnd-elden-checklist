import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ArmourSubCategoryMap,
  AshesOfWarSubCategoryMap,
  CraftItemsCategoryMap,
  GesturesAndMultiplayerSubCategoryMap,
  IncantationsSubCategoryMap,
  InfoItemsSubCategoryMap,
  ItemCategory,
  ItemSubCategory,
  KeyItemsSubCategoryMap,
  MeleWeaponsSubCategoryMap,
  RangedWeaponsSubCategoryMap,
  ShieldAndTorchesSubCategoryMap,
  SorceriesSubCategoryMap,
  SpiritAshesSubCategoryMap,
  TalismansSubCategoryMap,
  TearsOrUpgradesCategoryMap,
  ToolsOrBellBearingsCategoryMap,
  СonsumablesAndAmmoItemsCategoryMap,
} from "../global-types";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { itemsData } from "../data";

export interface Collection {
  shieldsAndTorchesData: ShieldAndTorchesSubCategoryMap;
  spiritAshesData: SpiritAshesSubCategoryMap;
  talismansData: TalismansSubCategoryMap;
  ashesOfWarData: AshesOfWarSubCategoryMap;
  sorceriesData: SorceriesSubCategoryMap;
  incantationsData: IncantationsSubCategoryMap;
  gesturesAndMultiplayerData: GesturesAndMultiplayerSubCategoryMap;
  meleWeaponsData: MeleWeaponsSubCategoryMap;
  rangedWeaponsData: RangedWeaponsSubCategoryMap;
  infoItemsData: InfoItemsSubCategoryMap;
  toolsAndBellBearingsData: ToolsOrBellBearingsCategoryMap;
  tearsAndUpgradesData: TearsOrUpgradesCategoryMap;
  craftData: CraftItemsCategoryMap;
  armourData: ArmourSubCategoryMap;
  consumablesAndAmmoData: СonsumablesAndAmmoItemsCategoryMap;
  keyItemsData: KeyItemsSubCategoryMap;
}

export interface State {
  collectionData: Collection;
}

const initialState: State = {
  collectionData: loadFromStorage("xnd.collection", itemsData),
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

      const toggleSingle = (item: { collected: boolean }) => {
        item.collected = !item.collected;
      };
      //@ts-ignore
      const toggleRecursive = (item: any, newValue: boolean) => {
        item.collected = newValue;

        if ("items" in item && Array.isArray(item.items)) {
          for (const subItem of item.items) {
            subItem.collected = newValue;

            if (Array.isArray(subItem.children)) {
              //@ts-ignore
              subItem.children.forEach((child) => {
                child.collected = newValue;
              });
            }
          }
        }
      };
      //@ts-ignore
      const updateParentCollectedStatus = (item: any) => {
        if ("children" in item && Array.isArray(item.children)) {
          //@ts-ignore
          const allCollected = item.children.every((child) => child.collected);
          item.collected = allCollected;
        }

        if ("items" in item && Array.isArray(item.items)) {
          //@ts-ignore
          const allCollected = item.items.every((i) => i.collected);
          item.collected = allCollected;
        }
      };

      // === Поиск на верхнем уровне (в том числе set) ===
      const topItem = items.find((s) => s.name === name);
      if (topItem) {
        const newValue = !topItem.collected;

        if (topItem.pieceType === "set") {
          toggleRecursive(topItem, newValue);
        } else {
          toggleSingle(topItem);
        }

        saveToStorage("xnd.collection", state.collectionData);
        return;
      }

      // === Поиск в items и children ===
      for (const item of items) {
        if (!("items" in item)) continue;

        for (const subItem of item.items) {
          if (subItem.name === name) {
            toggleSingle(subItem);
            updateParentCollectedStatus(item);
            saveToStorage("xnd.collection", state.collectionData);
            return;
          }

          if (Array.isArray(subItem.children)) {
            const childMatch = subItem.children.find(
              (child) => child.name === name
            );

            if (childMatch) {
              toggleSingle(childMatch);
              // Не трогаем родителя!
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
