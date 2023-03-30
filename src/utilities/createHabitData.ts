import lightFormat from "date-fns/lightFormat";

export function createHabitData() {
  const habitData = [];
  const rewardsDays = [
    Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 30),
    Math.ceil(Math.random() * 30),
  ];
  const startDate = new Date(Date.now());

  for (let i = 1; i <= 30; i++) {
    const currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i - 1);

    if (rewardsDays.includes(i)) {
      habitData.push({
        id: i,
        done: undefined,
        reward: true,
        date: lightFormat(currentDate, "yyyy-MM-dd"),
      });
    } else {
      habitData.push({
        id: i,
        done: undefined,
        reward: false,
        date: lightFormat(currentDate, "yyyy-MM-dd"),
      });
    }
  }
  return habitData;
}
