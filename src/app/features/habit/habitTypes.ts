export interface Habit {
  id: string;
  goal: string;
  schema: string;
  rewards: { label: string; day: number }[];
  habitStrength: {
    strength: number;
    history: { strength: number; date: Date }[];
  };
  data: boolean[];
  startDate: string;
}
