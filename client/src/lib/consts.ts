import type { ProgressProps } from "antd";

//Цвета прогрессбара
export const progressbarColors: ProgressProps["strokeColor"] = {
  "0%": "#3a3a3a",
  "20%": "#8b7c3b",
  "100%": "#112123",
};

//Палитра приложения дублированная для использования с Antd ConfigProvider
export const appPalette = {
  textPrimary: "#aa7714",
  textHighlighted: "#e8b339",
  successGreen: "#112123",
  bgDark: "#141414",
  bgLight: "#1f1f1f",
};
