import lightFormat from "date-fns/lightFormat";
import { add, sub } from "date-fns";

export function getWeekDays(startDate: string) {
  const weekDays = [];

  for (let i = 5; i >= 0; i--) {
    weekDays.push(
      lightFormat(sub(new Date(startDate), { days: i }), "yyyy-MM-dd")
    );
  }

  weekDays.push(
    lightFormat(add(new Date(startDate), { days: 1 }), "yyyy-MM-dd")
  );

  return weekDays;
}
