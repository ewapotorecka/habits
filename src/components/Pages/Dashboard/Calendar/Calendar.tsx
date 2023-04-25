import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import theme from "../../../../styles/theme";
import Day from "./CalendarDay/CalendarDay";

const Calendar = () => {
  const habit = useSelector((state: RootState) => state.habit);

  return (
    <Box>
      <Box sx={{ padding: "4rem", textAlign: "start" }}>
        <Typography variant="h4" color={theme.palette.common.white}>
          {habit.goal.toLocaleUpperCase()}
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.common.white}>
          {habit.schema}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          padding: "4rem",
        }}
      >
        {habit.data.map((done, index) => (
          <Day
            done={done}
            key={index}
            index={index}
            reward={habit.rewards.find((el) => el.day === index + 1)}
            startDate={habit.startDate}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
