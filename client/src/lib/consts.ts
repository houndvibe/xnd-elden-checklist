import type { ProgressProps } from "antd";

export const STORAGE_KEY = "xnd.eldenring.shields";

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
