import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";

type Language = "ru" | "en";

interface SettingsState {
  showSettings: boolean;
  spoilers: boolean;
  showWelcome: boolean;
  lang: Language;
}

const initialState: SettingsState = loadFromStorage(
  "XnDEldenCompendium.settings",
  {
    showSettings: true,
    spoilers: false,
    showWelcome: true,
    lang: "en",
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSpoilers: (state, action: PayloadAction<boolean>) => {
      state.spoilers = action.payload;
      saveToStorage("XnDEldenCompendium.settings", state);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
      saveToStorage("XnDEldenCompendium.settings", state);
    },
    setStopWelcome: (state) => {
      state.showWelcome = false;
      saveToStorage("XnDEldenCompendium.settings", state);
    },
    setLang: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
      saveToStorage("XnDEldenCompendium.settings", state);
    },
  },
});

export const { setSpoilers, setShowSettings, setStopWelcome, setLang } =
  settingsSlice.actions;
export default settingsSlice.reducer;
