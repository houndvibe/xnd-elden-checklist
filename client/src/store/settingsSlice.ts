import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { BASE_DISCOVERY, LOCALSTORAGE_SETTINGS_KEY } from "../lib/consts";

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
}

const initialState: SettingsState = loadFromStorage(LOCALSTORAGE_SETTINGS_KEY, {
  showSettings: true,
  spoilers: false,
  showWelcome: true,
  lang: "en",
  fastcheck: false,
  fastcheckSize: 92,
  discovery: BASE_DISCOVERY,
  showFCNames: false,
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
} = settingsSlice.actions;
export default settingsSlice.reducer;
