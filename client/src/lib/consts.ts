import type { ProgressProps } from "antd";
import type { ItemCategory } from "../global-types";

export const BASE_DISCOVERY = 100;

export const itemCategories: ItemCategory[] = [
  "meleWeapons",
  "rangedWeapons",
  "armour",
  "shieldsAndTorches",
  "talismans",
  "sorceries",
  "incantations",
  "spiritAshes",
  "ashesOfWar",
  "craft",
  "tearsAndUpgrades",
  "toolsAndBellBearings",
  "keyItems",
  "consumablesAndAmmo",
  "gesturesAndMultiplayer",
  "infoItems",
];

export const legendaryEligibleItemCategories: ItemCategory[] = [
  "meleWeapons",
  "rangedWeapons",
  "talismans",
  "spiritAshes",
  "sorceries",
  "incantations",
];

//Палитра приложения дублированная для использования с Antd ConfigProvider
export const APP_PALETTE = {
  textPrimary: "#aa7714",
  textHighlighted: "#e8b339",
  successGreen: "#112123",
  bgDark: "#141414",
  bgLight: "#1f1f1f",
};

//Цвета прогрессбара
export const PROGRESSBAR_COLORS: ProgressProps["strokeColor"] = {
  "0%": APP_PALETTE.textPrimary,
  "100%": APP_PALETTE.textPrimary,
};

//категории где много предметов с ощдинаковыми изображениями
export const exceptionalSubcategories = ["bellBearings", "cookbooks", "notes"];

export const TRUNCATE_LIMITS = {
  DASHBOARD: 16,
  SUB_CATEGOTY_LABEL: 23,
};

export const LOCALSTORAGE_COLLECTION_KEY = "XnDEldenCompendium.collection";
export const LOCALSTORAGE_SETTINGS_KEY = "XnDEldenCompendium.settings";
export const LOCALSTORAGE_CHECKPOINTS_KEY = "XnDEldenCompendium.checkpoints";
