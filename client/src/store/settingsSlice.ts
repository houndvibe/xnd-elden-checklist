import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { LOCALSTORAGE_SETTINGS_KEY } from "../lib/consts";

type Language = "ru" | "en";

interface SettingsState {
  showSettings: boolean;
  spoilers: boolean;
  showWelcome: boolean;
  lang: Language;
}

const initialState: SettingsState = loadFromStorage(LOCALSTORAGE_SETTINGS_KEY, {
  showSettings: true,
  spoilers: false,
  showWelcome: true,
  lang: "en",
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
  },
});

export const { setSpoilers, setShowSettings, setStopWelcome, setLang } =
  settingsSlice.actions;
export default settingsSlice.reducer;
