export interface Habit {
  id: string;
  goal: string;
  schema: string;
  rewards: { label: string; day: number }[];
  habitStrength: {
    strength: number;
    history: HabitStrength[];
  };
  data: boolean[];
  startDate: string;
}

export interface HabitStrength {
  strength: number;
  date: string;
}
