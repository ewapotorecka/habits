import { Box } from "@mui/material";
import theme from "../../../styles/theme";
import Calendar from "./Calendar/Calendar";
import Progress from "./Progress/Progress";
import lightFormat from "date-fns/lightFormat";
import { useEffect } from "react";
import { getHabitStrengthCheckDays } from "../../../utilities/getHabitStrengthCheckDays";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const habit = useSelector((state: RootState) => state.habit);
  const navigate = useNavigate();
  const today = lightFormat(new Date(), "yyyy-MM-dd");
  const habitStrengthCheckDays = getHabitStrengthCheckDays(habit.startDate);

  useEffect(() => {
    if (
      habitStrengthCheckDays.includes(today) &&
      !habit.habitStrength.history.find(
        (historyElement) => historyElement.date === today
      )
    ) {
      navigate("/strength");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
          height: "100%",
          background: theme.palette.common.black,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Calendar />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Progress />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
