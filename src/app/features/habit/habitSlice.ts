import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "./habitTypes";

import { Storage } from "../../../utilities/storage";

export const storage = new Storage<Habit>("habit");

const initialHabit: Habit = {
  id: null,
  goal: "",
  schema: "",
  rewards: [],
  habitStrength: {
    strength: 0,
    history: [],
  },
  data: [],
  startDate: "",
};

const savedHabit = storage.getHabitFromStorage();

const initialState: Habit = savedHabit ?? initialHabit;

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    toggleDone: (state, action: PayloadAction<number>) => {
      state.data[action.payload] = !state.data[action.payload];
    },
    setNewHabit: (state, action: PayloadAction<Habit>) => {
      return { ...action.payload };
    },
  },
});

export const { toggleDone, setNewHabit } = habitSlice.actions;

export default habitSlice.reducer;
