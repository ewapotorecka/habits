export function createHabitData() {
  const habitData = [];
  const rewardsDays: number[] = [];
  do {
    const random = Math.ceil(Math.random() * 30);

    if (!rewardsDays.includes(random)) {
      rewardsDays.push(random);
    }
  } while (rewardsDays.length < 6);

  for (let i = 1; i <= 30; i++) {
    habitData.push({
      done: false,
      reward: rewardsDays.includes(i),
    });
  }
  return habitData;
}
