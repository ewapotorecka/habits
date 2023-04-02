import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { toggleDone } from "../../../../app/features/habit/habitSlice";
import { RootState } from "../../../../app/store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "../../../../styles/theme";
import { HabitData } from "../../../../app/features/habit/habitTypes";

const Day = ({ day, index }: { day: HabitData; index: number }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        color: theme.palette.common.black,
        borderRadius: "100%",
        background: day.done ? theme.palette.secondary.main : "white",
        width: "3rem",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(toggleDone(index));
      }}
    >
      {day.done && <CheckCircleIcon />}
      {!day.done && <Typography variant="subtitle2">{index + 1}</Typography>}
    </Box>
  );
};

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
        {habit.data.map((day, index) => (
          <Day day={day} key={index} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
