import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../lib/utils/localStore";
import { Collection } from "./collectionSlice";
import { LOCALSTORAGE_CHECKPOINTS_KEY } from "../lib/consts";

export interface Checkpoint {
  id: string;
  name: string;
  date: string;
  collectionData: Collection;
}

export interface CheckpointDiff {
  categoryName: string;
  prevCount: number;
  currentCount: number;
  diff: number;
}

export interface State {
  checkpoints: Checkpoint[];
}

const initialState: State = {
  checkpoints: loadFromStorage(LOCALSTORAGE_CHECKPOINTS_KEY, []),
};

export const checkpointsSlice = createSlice({
  name: "checkpoints",
  initialState,
  reducers: {
    addCheckpoint: (
      state,
      action: PayloadAction<{
        name: string;
        collectionData: Collection;
      }>
    ) => {
      const { name, collectionData } = action.payload;

      const newCheckpoint: Checkpoint = {
        id: Date.now().toString(),
        name,
        date: new Date().toISOString(),
        collectionData,
      };

      state.checkpoints.push(newCheckpoint);
      saveToStorage(LOCALSTORAGE_CHECKPOINTS_KEY, state.checkpoints);
    },

    removeCheckpoint: (state, action: PayloadAction<string>) => {
      state.checkpoints = state.checkpoints.filter(
        (checkpoint) => checkpoint.id !== action.payload
      );
      saveToStorage(LOCALSTORAGE_CHECKPOINTS_KEY, state.checkpoints);
    },

    clearAllCheckpoints: (state) => {
      state.checkpoints = [];
      saveToStorage(LOCALSTORAGE_CHECKPOINTS_KEY, state.checkpoints);
    },
  },
});

export const { addCheckpoint, removeCheckpoint, clearAllCheckpoints } =
  checkpointsSlice.actions;

export default checkpointsSlice.reducer;
