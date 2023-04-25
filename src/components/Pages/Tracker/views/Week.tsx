import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import lightFormat from "date-fns/lightFormat";
import { add, sub } from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { getWeekDays } from "../../../../utilities/getWeekDays";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { HabitTracker } from "../../../../app/features/habit/habitTypes";
import { toggleTrackerDay } from "../../../../app/features/habit/habitSlice";
import { useState } from "react";
import theme from "../../../../styles/theme";

const WeekView = ({ tracker }: { tracker: HabitTracker[] }) => {
  const today = lightFormat(new Date(), "yyyy-MM-dd");
  const [visibleWeekDay, setVisibleWeekDay] = useState(today);
  const week = getWeekDays(visibleWeekDay);
  const dispatch = useDispatch();

  return (
    <Box>
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
          onClick={() => setVisibleWeekDay(getPrevWeekDay(visibleWeekDay))}
          color="secondary"
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="h6" color={theme.palette.common.white}>
          {`${week[0]} - ${week[6]}`}
        </Typography>

        <IconButton
          onClick={() => setVisibleWeekDay(getNextWeekDay(visibleWeekDay))}
          color="secondary"
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.common.black,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {week.map((day) => {
                return (
                  <TableCell
                    align="center"
                    key={day}
                    sx={{ color: theme.palette.common.white }}
                  >
                    {day}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracker.map((habit) => (
              <TableRow
                key={habit.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: theme.palette.common.white }}
                >
                  {habit.goal}
                </TableCell>

                {week.map((day) => {
                  return (
                    <TableCell
                      align="center"
                      key={`${day}-${habit.id}`}
                      onClick={() =>
                        dispatch(toggleTrackerDay({ id: habit.id, day }))
                      }
                      sx={{
                        cursor: "pointer",
                        color: theme.palette.common.white,
                      }}
                    >
                      {habit.tracker[day] ? (
                        <TaskAltIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeekView;

function getNextWeekDay(day: string) {
  return lightFormat(add(new Date(day), { days: 7 }), "yyyy-MM-dd");
}

function getPrevWeekDay(day: string) {
  return lightFormat(sub(new Date(day), { days: 7 }), "yyyy-MM-dd");
}
