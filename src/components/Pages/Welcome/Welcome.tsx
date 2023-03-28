import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <Typography variant="h4">Let's build your new habit</Typography>
      <Button
        variant="contained"
        sx={{ a: { textDecoration: "none", color: "white" } }}
      >
        <Link to="/form">Start here</Link>
      </Button>
    </Box>
  );
};

export default Welcome;
