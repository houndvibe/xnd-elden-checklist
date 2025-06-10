import type { ProgressProps } from "antd";
import type { ItemCategory } from "../global-types";

export const BASE_DISCOVERY = 100;

// Теперь создаём массив:
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
  "consumablesAndAmmo",
  "gestures",
  "infoItems",
  "keyItems",
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
  /*  "0%": "#5d5445",
  "20%": "#41473e",
  "40%": "#263937",
  "60%": "#14292b",
  "80%": "#0a2227",
  "100%": "#00121c", */

  "0%": APP_PALETTE.textPrimary,
  "100%": APP_PALETTE.textPrimary,
};
