import lightFormat from "date-fns/lightFormat";
import { add } from "date-fns";

export function getHabitStrengthCheckDays(startDate: string) {
  const checkDays = [];

  for (let i = 0; i <= 7; i++) {
    checkDays.push(
      lightFormat(add(new Date(startDate), { days: 5 * i }), "yyyy-MM-dd")
    );
  }

  return checkDays;
}
