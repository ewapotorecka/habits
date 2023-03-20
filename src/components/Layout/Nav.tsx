import { AppBar, Button, Toolbar } from "@mui/material";
import { Container } from "@mui/system";

const Nav = () => {
  return (
    <AppBar position="static" sx={{ background: "#DDEDAA", width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", gap: "2rem", justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            sx={{ color: "#564E58", border: " 2px solid #564E58" }}
          >
            Dashboard
          </Button>
          <Button
            variant="contained"
            sx={{ background: "#564E58", color: "#DDEDAA" }}
          >
            Tracker
          </Button>

          <Button variant="outlined">Knowledge</Button>
          <Button variant="outlined">Profile</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
