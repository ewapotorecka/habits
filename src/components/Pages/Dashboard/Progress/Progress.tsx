import { Box } from "@mui/material";
import Streak from "./Streak/Streak";
import HabitStrength from "./HabitStrength/HabitStrength";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { HabitData } from "../../../../app/features/habit/habitSlice";

const getStreakFromData = (data: HabitData[]) => {
  let currentStreak = 0;
  let longestStreak = 0;

  for (const day of data) {
    if (day.done) {
      currentStreak++;
    } else {
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        currentStreak = 0;
      } else {
        currentStreak = 0;
      }
    }
  }

  return currentStreak > longestStreak ? currentStreak : longestStreak;
};

const Progress = () => {
  const habit = useSelector((state: RootState) => state.habit);
  const streak = getStreakFromData(habit.data);

  return (
    <Box
      sx={{
        paddingTop: "10rem",
        height: "100%",
      }}
    >
      <Streak streak={streak} />
      <HabitStrength strength={30} />
    </Box>
  );
};
export default Progress;
