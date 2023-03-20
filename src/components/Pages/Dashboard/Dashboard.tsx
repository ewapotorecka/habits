import { Box, Typography } from "@mui/material";
import Nav from "../../Layout/Nav";
import Calendar from "../Calendar/Calendar";
import Progress from "./Progress/Progress";

const Dashboard = () => {
  return (
    <>
      {/* <Nav /> */}

      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <Box sx={{ background: "#BD4F6C", width: "100%" }}>
          <Calendar />
        </Box>
        <Box sx={{ background: "#F0CF65", width: "100%" }}>
          <Progress />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
