import { Box, Button, Chip } from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import WeekView from "./views/Week";
import AddHabitDialog from "./components/AddHabitDialog";
import DayView from "./views/Day";
import theme from "../../../styles/theme";

type View = "day" | "week" | "month";
const views: View[] = [
  "day",
  "week",
  // "month"
];

const Tracker = () => {
  const [currentView, setCurrentView] = useState<View>("day");
  const [dialogVisible, setDialogVisible] = useState(false);
  const tracker = useSelector((state: RootState) => state.habit.tracker);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.black,
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Box
        sx={{
          padding: "4rem 2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AddHabitDialog
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
        />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {views.map((view) => {
            return (
              <Chip
                key={view}
                label={view.toLocaleUpperCase()}
                color="secondary"
                variant={currentView === view ? "filled" : "outlined"}
                onClick={() => setCurrentView(view)}
              />
            );
          })}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setDialogVisible(true)}
        >
          Add new habit to tracker
        </Button>
      </Box>
      <Box>{currentView === "week" && <WeekView tracker={tracker} />}</Box>
      <Box>{currentView === "day" && <DayView tracker={tracker} />}</Box>
    </Box>
  );
};

export default Tracker;
