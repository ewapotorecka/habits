import { Box, Button } from "@mui/material";
import Streak from "./Streak/Streak";
import HabitStrength from "./HabitStrength/HabitStrength";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { calculateStreakFromHabitData } from "../../../../utilities/calculateStreak";
import { Link } from "react-router-dom";

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
      <HabitStrength
        strength={Math.floor((habit.habitStrength.strength / 4) * 100)}
      />
      <Link to="/strength">
        <Button color="secondary" size="small">
          Check current strength
        </Button>
      </Link>
    </Box>
  );
};
export default Progress;
