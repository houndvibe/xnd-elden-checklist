import type { ProgressProps } from "antd";
import type { ItemCategory } from "../global-types";

export const CURRENT_APP_VERSION = "(v. 0.9.2 beta)";

export const BOOSTY_LINK = "https://boosty.to/xnd";
export const PATREON_LINK = "https://www.patreon.com/XnDs";
export const YOUTUBE_LINK = "https://www.youtube.com/@XnDsChanel";

export const LOCALSTORAGE_COLLECTION_KEY = "XnDEldenCompendium.collection";
export const LOCALSTORAGE_SETTINGS_KEY = "XnDEldenCompendium.settings";
export const LOCALSTORAGE_CHECKPOINTS_KEY = "XnDEldenCompendium.checkpoints";

export const BASE_DISCOVERY = 100;

export const itemCategories: ItemCategory[] = [
  "consumablesAndAmmo",
  "toolsAndBellBearings",
  "gesturesAndMultiplayer",
  "spiritAshes",
  "craft",
  "tearsAndUpgrades",
  "keyItems",
  "sorceries",
  "incantations",
  "ashesOfWar",
  "meleWeapons",
  "rangedWeapons",
  "shieldsAndTorches",
  "armour",
  "talismans",
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

export const APP_PALETTE = {
  textPrimary: "#aa7714",
  textHighlighted: "#e8b339",
  successGreen: "#112123",
  bgDark: "#141414",
  bgLight: "#1f1f1f",
  text: "#856a51",
};

export const PROGRESSBAR_COLORS: ProgressProps["strokeColor"] = {
  "0%": APP_PALETTE.textPrimary,
  "100%": APP_PALETTE.textPrimary,
};

export const exceptionalSubcategories = ["bellBearings", "cookbooks", "notes"];

export const TRUNCATE_LIMITS = {
  DASHBOARD: 16,
  SUB_CATEGOTY_LABEL: 23,
};

export const FASTCHECK_SIZE_S = 40;
export const FASTCHECK_SIZE_M = 95;
export const FASTCHECK_SIZE_L = 140;
export const FASTCHECK_SIZE_XL = 210;
