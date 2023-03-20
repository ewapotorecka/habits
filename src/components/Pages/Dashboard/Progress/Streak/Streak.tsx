import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Streak = ({ streak }: { streak: number }) => {
  return (
    <Box>
      <Typography variant="body2">Streak</Typography>
      <Typography variant="h6">{streak}</Typography>
    </Box>
  );
};

export default Streak;
