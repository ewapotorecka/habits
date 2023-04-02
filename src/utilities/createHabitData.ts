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

  for (let i = 1; i <= 30; i++) {
    if (rewardsDays.includes(i)) {
      habitData.push({
        done: undefined,
        reward: true,
      });
    } else {
      habitData.push({
        done: undefined,
        reward: false,
      });
    }
  }
  return habitData;
}
