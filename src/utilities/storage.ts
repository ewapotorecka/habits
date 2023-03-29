import { HabitSlice } from "../app/features/habit/habitSlice";

export class Storage {
  habit: HabitSlice | null;
  constructor() {
    const savedHabit = localStorage.getItem("habit");

    this.habit = savedHabit ? JSON.parse(savedHabit) : null;
  }
  updateStorage(data: HabitSlice) {
    localStorage.setItem("habit", JSON.stringify(data));
  }
  getHabitFromStorage() {
    return this.habit;
  }
}
