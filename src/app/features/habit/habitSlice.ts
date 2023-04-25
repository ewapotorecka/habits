import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Habit, HabitStrength, TrackerDay } from "./habitTypes";

import { Storage } from "../../../utilities/storage";

export const storage = new Storage<Habit>("habit");

const initialHabit: Habit = {
  id: "",
  goal: "",
  schema: "",
  rewards: [],
  habitStrength: {
    strength: 0,
    history: [],
  },
  data: [],
  startDate: "",
  tracker: [],
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
      return { ...action.payload, tracker: state.tracker };
    },
    updateHabitStrength: (state, action: PayloadAction<HabitStrength>) => {
      state.habitStrength = {
        strength: action.payload.strength,
        history: [
          ...state.habitStrength.history,
          { strength: action.payload.strength, date: action.payload.date },
        ],
      };
    },
    addHabitToTracker: (state, action: PayloadAction<string>) => {
      state.tracker = [
        ...state.tracker,
        { goal: action.payload, tracker: {}, id: crypto.randomUUID() },
      ];
    },
    toggleTrackerDay: (
      state,
      action: PayloadAction<{ id: string; day: string }>
    ) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const habitToToggle = state.tracker.find(
        (habit) => habit.id === action.payload.id
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (habitToToggle.tracker[action.payload.day]) {
        habitToToggle!.tracker[action.payload.day] =
          !habitToToggle!.tracker[action.payload.day];
      } else {
        habitToToggle!.tracker[action.payload.day] = true;
      }
    },
  },
});

export const {
  toggleDone,
  setNewHabit,
  updateHabitStrength,
  addHabitToTracker,
  toggleTrackerDay,
} = habitSlice.actions;

export default habitSlice.reducer;
