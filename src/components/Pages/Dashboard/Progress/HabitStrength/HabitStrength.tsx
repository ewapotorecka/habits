import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../../../../styles/theme";

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
      <Typography variant="body2" color={theme.palette.common.white}>
        Habit Strength
      </Typography>
      <Typography variant="h5" color={theme.palette.common.white}>
        {strength}
      </Typography>
      <Box
        sx={{
          border: `2px solid ${theme.palette.secondary.main}`,
          width: "40%",
          height: "2rem",
          borderRadius: "4rem",
          margin: "4rem",
          background: `linear-gradient(to right, ${theme.palette.secondary.main} 0%,  ${theme.palette.secondary.main} ${strength}%, transparent ${strength}%, transparent 100%)`,
        }}
      ></Box>
    </Box>
  );
};

export default HabitStrength;
