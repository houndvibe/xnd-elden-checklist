import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";

interface SettingsState {
  showSettings: boolean;
  spoilers: boolean;
  showWelcome: boolean;
}

const initialState: SettingsState = loadFromStorage("xnd.settings", {
  showSettings: true,
  spoilers: false,
  showWelcome: true,
});

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSpoilers: (state, action: PayloadAction<boolean>) => {
      state.spoilers = action.payload;
      saveToStorage("xnd.settings", state);
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
      saveToStorage("xnd.settings", state);
    },
    setStopWelcome: (state) => {
      state.showWelcome = false;
      saveToStorage("xnd.settings", state);
    },
  },
});

export const { setSpoilers, setShowSettings, setStopWelcome } =
  settingsSlice.actions;
export default settingsSlice.reducer;
