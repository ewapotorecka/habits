import { Habit } from "../app/features/habit/habitTypes";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export function calculateStreakFromHabitData(habit: Habit) {
  let streak = 0;
  const daysCount = differenceInCalendarDays(
    new Date(),
    new Date(habit.startDate)
  );

  for (let i = daysCount; i >= 0; i--) {
    if (habit.data[i].done) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
