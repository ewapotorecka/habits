import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "../../../utilities/storage";
import { HabitSlice } from "./habitTypes";

const storage = new Storage();

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
