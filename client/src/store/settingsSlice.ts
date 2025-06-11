import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  spoilers: boolean;
}

const initialState: SettingsState = {
  spoilers: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSpoilers: (state, action: PayloadAction<boolean>) => {
      state.spoilers = action.payload;
    },
  },
});

export const { setSpoilers } = settingsSlice.actions;
export default settingsSlice.reducer;
