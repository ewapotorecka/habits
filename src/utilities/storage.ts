import { HabitSlice } from "../app/features/habit/habitTypes";

export class HabitStorage {
  habit: HabitSlice | null;
  constructor() {
    const savedHabit = localStorage.getItem("habit");

    this.habit = savedHabit ? JSON.parse(savedHabit) : null;
  }
  updateStorage(data: { habit: HabitSlice }) {
    console.log(data);
    localStorage.setItem("habit", JSON.stringify(data.habit));
  }
  getHabitFromStorage() {
    return this.habit;
  }
}
