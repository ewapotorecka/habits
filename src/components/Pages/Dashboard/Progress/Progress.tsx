import { Box } from "@mui/material";
import Streak from "./Streak/Streak";
import HabitStrength from "./HabitStrength/HabitStrength";

const Progress = () => {
  return (
    <Box>
      <Streak streak={7} />
      <HabitStrength strength={10} />
    </Box>
  );
};
export default Progress;
