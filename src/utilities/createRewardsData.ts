export function createRewardsData(rewards: { label: string; id: number }[]) {
  const rewardsData: { day: number; label: string }[] = [];

  do {
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    const day = Math.floor(Math.random() * 30);

    rewardsData.push({ label: reward.label, day });
  } while (rewardsData.length < 6);

  return rewardsData;
}
