import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const data = [
//   { id: 1, done: false, reward: true },
//   { id: 2, done: true, reward: false },
//   { id: 3, done: false, reward: false },
//   { id: 4, done: undefined, reward: false },
//   { id: 5, done: false, reward: false },
//   { id: 6, done: false, reward: false },
//   { id: 7, done: false, reward: false },
//   { id: 8, done: false, reward: false },
//   { id: 9, done: false, reward: false },
//   { id: 10, done: false, reward: false },
//   { id: 11, done: false, reward: false },
//   { id: 12, done: false, reward: false },
//   { id: 13, done: false, reward: false },
//   { id: 14, done: false, reward: false },
//   { id: 15, done: false, reward: false },
//   { id: 16, done: false, reward: false },
//   { id: 17, done: false, reward: false },
//   { id: 18, done: false, reward: false },
//   { id: 19, done: false, reward: false },
//   { id: 20, done: false, reward: false },
//   { id: 21, done: false, reward: false },
//   { id: 22, done: false, reward: false },
//   { id: 23, done: false, reward: false },
//   { id: 24, done: false, reward: false },
//   { id: 25, done: false, reward: false },
//   { id: 26, done: true, reward: false },
//   { id: 27, done: false, reward: false },
//   { id: 28, done: false, reward: false },
//   { id: 29, done: false, reward: false },
//   { id: 30, done: false, reward: false },
// ];

export const habit = {
  id: null,
  goal: "",
  schema: "",
  startDate: null,
  rewards: [],
  habitStrength: {
    strength: 0,
    history: [],
  },
  data: [],
};

export interface HabitSlice {
  id: number | null;
  goal: string;
  schema: string;
  startDate: number | null;
  rewards: string[];
  habitStrength: {
    strength: number;
    history: { strength: number; date: Date }[];
  };
  data: { id: number; done?: boolean; reward: boolean }[];
}

const initialState: HabitSlice = habit;

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    toggleDone: (state, action: PayloadAction<number>) => {
      const dayToToggle = state.data.find((el) => el.id === action.payload);

      if (dayToToggle!.done) {
        dayToToggle!.done = false;
      } else {
        dayToToggle!.done = true;
      }
    },
    setNewHabit: (state, action: PayloadAction<HabitSlice>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDone, setNewHabit } = habitSlice.actions;

export default habitSlice.reducer;
