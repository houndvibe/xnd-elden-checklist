import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  showSettings: boolean;
  spoilers: boolean;
}

const initialState: SettingsState = {
  showSettings: false,
  spoilers: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSpoilers: (state, action: PayloadAction<boolean>) => {
      state.spoilers = action.payload;
    },
    setShowSettings: (state, action: PayloadAction<boolean>) => {
      state.showSettings = action.payload;
    },
  },
});

export const { setSpoilers, setShowSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
