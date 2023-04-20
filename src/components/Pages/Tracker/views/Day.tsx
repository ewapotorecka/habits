import { Box, Container, IconButton, Typography } from "@mui/material";
import lightFormat from "date-fns/lightFormat";
import { add, sub } from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { useDispatch } from "react-redux";
import { HabitTracker } from "../../../../app/features/habit/habitTypes";
import { toggleTrackerDay } from "../../../../app/features/habit/habitSlice";
import theme from "../../../../styles/theme";
import { useState } from "react";

const DayView = ({ tracker }: { tracker: HabitTracker[] }) => {
  const today = lightFormat(new Date(), "yyyy-MM-dd");
  const [visibleDay, setVisibleDay] = useState(today);
  const dispatch = useDispatch();

  return (
    <Container
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          padding: "0 0 2rem 0",
        }}
      >
        <IconButton
          onClick={() => setVisibleDay(getPrevDay(visibleDay))}
          color="secondary"
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="h6" color={theme.palette.common.white}>
          {visibleDay}
        </Typography>

        <IconButton
          onClick={() => setVisibleDay(getNextDay(visibleDay))}
          color="secondary"
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {tracker.map((habit) => {
          return (
            <Box
              key={habit.id}
              onClick={() =>
                dispatch(toggleTrackerDay({ id: habit.id, day: visibleDay }))
              }
              sx={{
                backgroundColor: habit.tracker[visibleDay]
                  ? theme.palette.secondary.dark
                  : theme.palette.common.white,
                padding: "1rem",
                border: `2px solid ${theme.palette.secondary.dark}`,
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "24rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              {habit.tracker[visibleDay] ? (
                <TaskAltIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}

              <Typography variant="subtitle2">{habit.goal}</Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default DayView;

function getNextDay(day: string) {
  return lightFormat(add(new Date(day), { days: 1 }), "yyyy-MM-dd");
}

function getPrevDay(day: string) {
  return lightFormat(sub(new Date(day), { days: 1 }), "yyyy-MM-dd");
}
