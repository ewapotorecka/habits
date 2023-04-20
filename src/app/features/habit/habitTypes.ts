export interface TrackerDay {
  [date: string]: boolean | undefined;
}

export interface HabitTracker {
  goal: string;
  tracker: TrackerDay;
  id: string;
}

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
  tracker: HabitTracker[];
}

export interface HabitStrength {
  strength: number;
  date: string;
}
