import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "../../../utilities/storage";

const storage = new Storage();

export const initialHabit = {
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

export interface HabitData {
  id: number;
  done?: boolean;
  reward: boolean;
}

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
  data: HabitData[];
}

const savedHabit = storage.habit;

const initialState: HabitSlice = savedHabit ? savedHabit : initialHabit;

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    toggleDone: (state, action: PayloadAction<number>) => {
      const dayToToggle = state.data.find((el) => el.id === action.payload);

      if (dayToToggle) {
        dayToToggle.done = !dayToToggle.done;
      }

      storage.updateStorage(state);
    },
    setNewHabit: (state, action: PayloadAction<HabitSlice>) => {
      storage.updateStorage({
        ...action.payload,
      });
      return { ...action.payload };
    },
  },
});

export const { toggleDone, setNewHabit } = habitSlice.actions;

export default habitSlice.reducer;
