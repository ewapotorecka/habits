import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "./habitTypes";

import { HabitStorage } from "../../../utilities/storage";

export const storage = new HabitStorage("habit");

const initialHabit = {
  id: null,
  goal: "",
  schema: "",
  rewards: [],
  habitStrength: {
    strength: 0,
    history: [],
  },
  data: [],
};

const savedHabit = storage.getHabitFromStorage();

const initialState: Habit = savedHabit ?? initialHabit;

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    toggleDone: (state, action: PayloadAction<number>) => {
      const dayToToggle = state.data[action.payload];

      if (dayToToggle) {
        dayToToggle.done = !dayToToggle.done;
      }
    },
    setNewHabit: (state, action: PayloadAction<Habit>) => {
      return { ...action.payload };
    },
  },
});

export const { toggleDone, setNewHabit } = habitSlice.actions;

export default habitSlice.reducer;
