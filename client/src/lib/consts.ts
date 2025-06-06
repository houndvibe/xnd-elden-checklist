import type { ProgressProps } from "antd";
import type { ItemCategory } from "../global-types";

export enum STORAGE_KEYS {
  shields = "xnd.eldenring.shields",
  spiritAshes = "xnd.eldenring.spiritAshes",
}

export const legendaryEligibleItemCategories: ItemCategory[] = [
  "weapons",
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
  "0%": "#3a3a3a",
  "20%": "#8b7c3b",
  "100%": "#112123",
};
