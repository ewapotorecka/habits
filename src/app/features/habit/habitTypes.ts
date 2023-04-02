export interface HabitData {
  done?: boolean;
  reward: boolean;
}

export interface Habit {
  id: number | null;
  goal: string;
  schema: string;
  rewards: { label: string; id: number }[];
  habitStrength: {
    strength: number;
    history: { strength: number; date: Date }[];
  };
  data: HabitData[];
  startDate: string;
}
