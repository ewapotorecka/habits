export function createRewardsData(rewards: { label: string; id: number }[]) {
  const rewardsData: { day: number; label: string }[] = [];

  while (rewardsData.length < 6) {
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    const day = Math.ceil(Math.random() * 30);

    if (!rewardsData.some((reward) => reward.day === day)) {
      rewardsData.push({ label: reward.label, day });
    }
  }

  return rewardsData;
}
