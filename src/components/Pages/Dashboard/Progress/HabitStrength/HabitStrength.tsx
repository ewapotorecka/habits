import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const HabitStrength = ({ strength }: { strength: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2">Habit Strength</Typography>
      <Typography variant="h6">{strength}</Typography>
      <Box
        sx={{
          border: "2px solid black",
          width: "40%",
          height: "2rem",
          borderRadius: "4rem",
          margin: "4rem",
          background: `linear-gradient(to right, #4C9F70 0%, #4C9F70 ${strength}%, #FFFFFF ${strength}%, #FFFFFF 100%)`,
        }}
      ></Box>
    </Box>
  );
};

export default HabitStrength;
