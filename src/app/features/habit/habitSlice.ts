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

const savedHabit = storage.getHabitFromStorage();

const initialState: HabitSlice = savedHabit ? savedHabit : initialHabit;

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
      storage.updateStorage(state);
    },
    setNewHabit: (state, action: PayloadAction<HabitSlice>) => {
      const { data, id, goal, schema, startDate, rewards, habitStrength } =
        action.payload;
      state.data = data;
      state.id = id;
      state.goal = goal;
      state.schema = schema;
      state.startDate = startDate;
      state.rewards = rewards;
      state.habitStrength = habitStrength;

      storage.updateStorage(state);
    },
  },
});

export const { toggleDone, setNewHabit } = habitSlice.actions;

export default habitSlice.reducer;
