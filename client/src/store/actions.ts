import {
  AshesOfWarSubCategoryMap,
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
} from "../global-types";
import { AppDispatch } from "./appStore";
import {
  toggleAshOfWarCollected,
  toggleGestureCollected,
  toggleIncantationCollected,
  toggleInfoItemCollected,
  toggleMeleWeaponCollected,
  toggleRangedWeaponCollected,
  toggleShieldOrTorchCollected,
  toggleSorceryCollected,
  toggleSpiritAshCollected,
  toggleTalismanCollected,
  toggleTearOrUpgradeCollected,
  toggleToolOrBellCollected,
} from "./collectionSlice";

export function getStoreAction(
  type: ItemCategory,
  name: string,
  category: ItemSubCategory,
  dispatch: AppDispatch
) {
  if (type === "shieldsAndTorches") {
    dispatch(
      toggleShieldOrTorchCollected({
        category: category as keyof ShieldAndTorchesSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "spiritAshes") {
    return dispatch(
      toggleSpiritAshCollected({
        category: category as keyof SpiritAshesSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "talismans") {
    dispatch(
      toggleTalismanCollected({
        category: category as keyof TalismansSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "sorceries") {
    dispatch(
      toggleSorceryCollected({
        category: category as keyof SorceriesSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "ashesOfWar") {
    dispatch(
      toggleAshOfWarCollected({
        category: category as keyof AshesOfWarSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "incantations") {
    dispatch(
      toggleIncantationCollected({
        category: category as keyof IncantationsSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "gestures") {
    dispatch(
      toggleGestureCollected({
        category: category as keyof GesturesSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "meleWeapons") {
    dispatch(
      toggleMeleWeaponCollected({
        category: category as keyof MeleWeaponsSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "rangedWeapons") {
    dispatch(
      toggleRangedWeaponCollected({
        category: category as keyof RangedWeaponsSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "infoItems") {
    dispatch(
      toggleInfoItemCollected({
        category: category as keyof InfoItemsSubCategoryMap,
        name: name,
      })
    );
  } else if (type === "toolsAndBellBearings") {
    dispatch(
      toggleToolOrBellCollected({
        category: category as keyof ToolsOrBellBearingsCategoryMap,
        name: name,
      })
    );
  } else if (type === "tearsAndUpgrades") {
    dispatch(
      toggleTearOrUpgradeCollected({
        category: category as keyof TearsOrUpgradesCategoryMap,
        name: name,
      })
    );
  }
}
