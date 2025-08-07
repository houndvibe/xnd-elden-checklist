import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import {
  BASE_DISCOVERY,
  FASTCHECK_SIZE_M,
  itemCategories,
  itemSubCategories,
  LOCALSTORAGE_SETTINGS_KEY,
} from "../lib/consts";
import { trimDataSuffix } from "../lib/utils/misc";

type Language = "ru" | "en";

interface SettingsState {
  showSettings: boolean;
  spoilers: boolean;
  showWelcome: boolean;
  lang: Language;
  fastcheck: boolean;
  fastcheckSize: number;
  discovery: number;
  showFCNames: boolean;
  checkedCategories: string[];
  checkedSubcategories: string[];
  openCategories: string[];
  checkDlc: boolean;
  altArmor: boolean;
  loosable: boolean;
  missedOnly: boolean;
}

const initialState: SettingsState = loadFromStorage(LOCALSTORAGE_SETTINGS_KEY, {
  showSettings: false,
  spoilers: false,
  showWelcome: true,
  lang: "en",
  fastcheck: true,
  fastcheckSize: FASTCHECK_SIZE_M,
  discovery: BASE_DISCOVERY,
  showFCNames: true,
  checkedCategories: itemCategories,
  checkedSubcategories: itemSubCategories,
  openCategories: [],
  checkDlc: true,
  altArmor: false,
  loosable: false,
  missedOnly: false,
});

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSpoilers: (state, action: PayloadAction<boolean>) => {
      state.spoilers = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setStopWelcome: (state) => {
      state.showWelcome = false;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setLang: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setFastcheck: (state, action: PayloadAction<boolean>) => {
      state.fastcheck = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setFastcheckSize: (state, action: PayloadAction<number>) => {
      state.fastcheckSize = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setDiscovery: (state, action: PayloadAction<number>) => {
      state.discovery = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    toggleFCNames: (state) => {
      state.showFCNames = !state.showFCNames;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    toggleCategoryChecked: (
      state,
      action: PayloadAction<{ category: string; subkeys: string[] }>
    ) => {
      const { category, subkeys } = action.payload;
      const isChecked = state.checkedCategories.includes(
        trimDataSuffix(category)
      );

      if (isChecked) {
        state.checkedCategories = state.checkedCategories.filter(
          (c) => c !== trimDataSuffix(category)
        );
        state.checkedSubcategories = state.checkedSubcategories.filter(
          (s) => !subkeys.includes(s)
        );
      } else {
        state.checkedCategories.push(trimDataSuffix(category));
        const set = new Set([...state.checkedSubcategories, ...subkeys]);
        state.checkedSubcategories = Array.from(set);
      }
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },

    toggleSubcategoryChecked: (state, action: PayloadAction<string>) => {
      const sub = action.payload;
      if (state.checkedSubcategories.includes(sub)) {
        state.checkedSubcategories = state.checkedSubcategories.filter(
          (s) => s !== sub
        );
      } else {
        state.checkedSubcategories.push(sub);
      }
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },

    toggleCategoryOpen: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.openCategories.includes(category)) {
        state.openCategories = state.openCategories.filter(
          (c) => c !== category
        );
      } else {
        state.openCategories.push(category);
      }
    },
    setAllCategoriesChecked: (state, action: PayloadAction<string[]>) => {
      state.checkedCategories = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setAllSubcategoriesChecked: (state, action: PayloadAction<string[]>) => {
      state.checkedSubcategories = action.payload;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setCheckDlc: (state) => {
      state.checkDlc = !state.checkDlc;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setAltArmor: (state) => {
      state.altArmor = !state.altArmor;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setLoosable: (state) => {
      state.loosable = !state.loosable;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
    setMissedOnly: (state) => {
      state.missedOnly = !state.missedOnly;
      saveToStorage(LOCALSTORAGE_SETTINGS_KEY, state);
    },
  },
});

export const {
  setSpoilers,
  setShowSettings,
  setStopWelcome,
  setLang,
  setFastcheck,
  setFastcheckSize,
  setDiscovery,
  toggleFCNames,
  toggleCategoryChecked,
  toggleSubcategoryChecked,
  toggleCategoryOpen,
  setAllCategoriesChecked,
  setAllSubcategoriesChecked,
  setCheckDlc,
  setAltArmor,
  setLoosable,
  setMissedOnly,
} = settingsSlice.actions;
export default settingsSlice.reducer;
