import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import theme from "../../../../../styles/theme";

const Streak = ({ streak }: { streak: number }) => {
  console.log(streak, "streak");
  return (
    <Box>
      <Typography variant="body2" color={theme.palette.common.white}>
        Streak
      </Typography>
      <Typography variant="h5" color={theme.palette.common.white}>
        {streak}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0 4rem",
        }}
      >
        <Box
          sx={{
            width: "8rem",
            height: "4rem",
            position: "relative",
            boxSizing: "border-box",
            overflow: "hidden",

            "&:after": {
              content: "''",
              position: "absolute",
              left: 0,
              top: 0,
              width: "8rem",
              height: "8rem",
              border: "2rem solid",
              boxSizing: "border-box",
              borderColor: "#74E000 #74E000 #00171F #00171F",
              borderRadius: "50%",
              transform: `rotate(${-225 + (180 * streak) / 30}deg)`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Streak;
