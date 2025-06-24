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
import { LOCALSTORAGE_COLLECTION_KEY } from "../lib/consts";

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
  collectionData: loadFromStorage(LOCALSTORAGE_COLLECTION_KEY, itemsData),
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
        saveToStorage(LOCALSTORAGE_COLLECTION_KEY, state.collectionData);
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

      if (talisman.versions && tier !== undefined) {
        const version = talisman.versions.find((v) => v.tier === tier);
        if (version) {
          version.collected = !version.collected;

          talisman.collected = talisman.versions.every((v) => v.collected);
        }
      } else {
        talisman.collected = !talisman.collected;
      }

      saveToStorage(LOCALSTORAGE_COLLECTION_KEY, state.collectionData);
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

      const toggleSingle = (
        item: { collected: boolean },
        newValue?: boolean
      ) => {
        item.collected =
          typeof newValue === "boolean" ? newValue : !item.collected;
      };

      // @ts-ignore
      const updateParentCollectedStatus = (set: any) => {
        if (!("items" in set) || !Array.isArray(set.items)) return;
        // @ts-ignore
        const allItemsAndChildrenCollected = set.items.every((item) => {
          if (!item.collected) return false;

          if (Array.isArray(item.children) && item.children.length > 0) {
            // @ts-ignore
            return item.children.every((child) => child.collected);
          }

          return true;
        });

        set.collected = allItemsAndChildrenCollected;
      };

      // ✅ Распространение collected по другим сетам
      const propagateToOtherSets = (targetName: string, newValue: boolean) => {
        for (const otherSet of items) {
          if (!("items" in otherSet)) continue;

          for (const part of otherSet.items) {
            if (part.name === targetName) {
              toggleSingle(part, newValue);
            }
          }

          updateParentCollectedStatus(otherSet);
        }
      };

      // @ts-ignore
      const toggleSetRecursively = (set: any, newValue: boolean) => {
        toggleSingle(set, newValue);

        for (const subItem of set.items) {
          toggleSingle(subItem, newValue);
          propagateToOtherSets(subItem.name, newValue);

          if (Array.isArray(subItem.children)) {
            // @ts-ignore
            subItem.children.forEach((child) => toggleSingle(child, newValue));
          }
        }

        updateParentCollectedStatus(set);
      };

      const updateSetCollectedStatusByChild = (childName: string) => {
        for (const set of items) {
          if (!("items" in set)) continue;

          const hasThisChild = set.items.some(
            (item) =>
              Array.isArray(item.children) &&
              item.children.some((child) => child.name === childName)
          );

          if (hasThisChild) {
            updateParentCollectedStatus(set);
            return;
          }
        }
      };

      const topItem = items.find((s) => s.name === name);
      if (topItem) {
        const newValue = !topItem.collected;

        if (topItem.pieceType === "set") {
          toggleSetRecursively(topItem, newValue);
        } else {
          toggleSingle(topItem, newValue);
          propagateToOtherSets(topItem.name, newValue);
        }

        saveToStorage(LOCALSTORAGE_COLLECTION_KEY, state.collectionData);
        return;
      }

      for (const item of items) {
        if (!("items" in item)) continue;

        for (const subItem of item.items) {
          if (subItem.name === name) {
            const newValue = !subItem.collected;
            toggleSingle(subItem, newValue);
            propagateToOtherSets(subItem.name, newValue);
            updateParentCollectedStatus(item);
            saveToStorage(LOCALSTORAGE_COLLECTION_KEY, state.collectionData);
            return;
          }

          if (Array.isArray(subItem.children)) {
            const childMatch = subItem.children.find(
              (child) => child.name === name
            );

            if (childMatch) {
              toggleSingle(childMatch);
              updateSetCollectedStatusByChild(childMatch.name);
              saveToStorage(LOCALSTORAGE_COLLECTION_KEY, state.collectionData);
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
