import { Box } from "@mui/material";
import Streak from "./Streak/Streak";
import HabitStrength from "./HabitStrength/HabitStrength";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { calculateStreakFromHabitData } from "../../../../utilities/calculateStreak";

const Progress = () => {
  const habit = useSelector((state: RootState) => state.habit);
  const streak = calculateStreakFromHabitData(habit);

  return (
    <Box
      sx={{
        paddingTop: "10rem",
      }}
    >
      <Streak streak={streak} />
      <HabitStrength strength={(habit.habitStrength.strength / 4) * 100} />
    </Box>
  );
};
export default Progress;
