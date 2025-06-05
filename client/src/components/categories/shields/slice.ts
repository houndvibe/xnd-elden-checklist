import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { shieldsData, type Shields } from "./data";

// utils
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Storage write failed", err);
  }
}

const STORAGE_KEY = "xnd.eldenring.shields";

const initialState = {
  shieldsData: loadFromStorage(STORAGE_KEY, shieldsData),
};

export const shieldsSlice = createSlice({
  name: "shields",
  initialState,
  reducers: {
    changeShieldStatus: (state, action: PayloadAction<Shields>) => {
      state.shieldsData = action.payload;
      saveToStorage(STORAGE_KEY, action.payload);
    },
    toggleShieldCollected: (
      state,
      action: PayloadAction<{ category: keyof Shields; name: string }>
    ) => {
      const { category, name } = action.payload;
      const shield = state.shieldsData[category].find((s) => s.name === name);
      if (shield) {
        shield.collected = !shield.collected;
        saveToStorage(STORAGE_KEY, state.shieldsData);
      }
    },
  },
});

export const { changeShieldStatus, toggleShieldCollected } =
  shieldsSlice.actions;
export default shieldsSlice.reducer;
