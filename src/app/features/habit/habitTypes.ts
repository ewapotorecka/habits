export interface HabitData {
  id: number;
  done?: boolean;
  reward: boolean;
  date: string;
}

export interface HabitSlice {
  id: number | null;
  goal: string;
  schema: string;
  rewards: string[];
  habitStrength: {
    strength: number;
    history: { strength: number; date: Date }[];
  };
  data: HabitData[];
}
