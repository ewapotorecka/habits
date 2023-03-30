import lightFormat from "date-fns/lightFormat";
import { HabitData } from "../app/features/habit/habitTypes";

export function calculateStreakFromHabitData(data: HabitData[]) {
  const today = new Date(Date.now());
  let streak = 0;

  const todayIndex = data.findIndex(
    (el) => el.date === lightFormat(today, "yyyy-MM-dd")
  );

  for (let i = todayIndex; i >= 0; i--) {
    if (data[i].done) {
      streak++;
    } else {
      return streak;
    }
  }
  return streak;
}
