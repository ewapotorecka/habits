import { HabitSlice } from "../app/features/habit/habitSlice";

export class Storage {
  updateStorage(data: HabitSlice) {
    localStorage.setItem("habit", JSON.stringify(data));
  }
  getHabitFromStorage() {
    const savedHabit = localStorage.getItem("habit");

    return savedHabit ? JSON.parse(savedHabit) : null;
  }
}
