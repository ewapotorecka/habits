import { Box } from "@mui/material";
import theme from "../../../styles/theme";
import Calendar from "./Calendar/Calendar";
import Progress from "./Progress/Progress";

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
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
